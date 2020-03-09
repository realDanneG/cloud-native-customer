'use strict';
const AWS = require("aws-sdk")
const db = new AWS.DynamoDB.DocumentClient({apiVersion:"2012-08-10"})
const uuid = require("uuid/v4")
const joi = require("joi")

const customerTable = process.env.CUSTOMERS_TABLE

//Create response
function response(statuscode,message)
{
  return {
    statusCode:statuscode,
    headers:{'Access-Control-Allow-Origin':'*'},
    body:JSON.stringify(message)
  }
}

//Create sort
function sortByDate(a,b)
{
  if(a.createdAt > b.createdAt)
  {
    return -1
  } else return 1;
}

//Check if key + value pair exists : return true or false
function checkKeyValuePair(obj,key,value)
{
  if(obj[key]==value){
    return true;
  } else {return false};
}

//Create customer
module.exports.createCustomer = ( event, context, callback ) =>
{
  const reqBody = JSON.parse(event.body);
  
  //Check that atleast first and lastname exists
  if(!reqBody.firstname || reqBody.firstname.trim() ==="" || !reqBody.lastname || reqBody.lastname.trim() ==="")
  {
    return callback(null,response(400,{error:"Request must have firstname and lastname and cannot be empty"}))
  }
  db.scan({
    TableName: customerTable
  }).promise().then(res =>{
    var items=res.Items;
    var foundUser=false;
    for(var i = 0 ; i<items.length ; i++)
    {
      var obj=items[i];
      if(checkKeyValuePair(obj,'email',reqBody.email)==true)
      {
        foundUser=true;
      }
    }
    if(foundUser==true)
    {
      callback(null,response(400,{message:"Email already registred"}));
    }
    else
    {
      const schema = joi.object().keys({
        id:joi.string(),
        createdAt:joi.date().iso(),
        firstname:joi.string().trim().required(),
        lastname: joi.string().trim().required(),
        password:joi.string().trim().required(),
        gender:joi.string().trim(),
        email:joi.string().trim().email().required(),
        phone:joi.string().trim(),
        adress:joi.string(),
        zipcode:joi.string().trim(),
        country:joi.string().trim(),
        returningcustomer:joi.bool(),
        admin:joi.bool(),
      });
      const customer = 
      {
        id:uuid(),
        createdAt:new Date().toISOString(),
        firstname:reqBody.firstname,
        lastname:reqBody.lastname,
        password:reqBody.password,
        gender:reqBody.gender,
        email:reqBody.email,
        phone:reqBody.phone,
        adress:reqBody.adress,
        zipcode:reqBody.zipcode,
        country:reqBody.country,
        returningcustomer:false,
        admin:reqBody.admin,
      };
      joi.validate(customer,schema,(err,result)=>
      {
        if(err)
        {
          return callback(null,response(400,{error:"Sent data does not match the requirements"}))
        }
        else
        {
          return db.put
          ({
            TableName: customerTable,
            Item: customer
          }).promise().then(()=>{
            callback(null, response(201,customer))
          })
          .catch(err => response(null,response(err.statusCode,err)));
        }
      });
    }
  });
}

//Get all customers
module.exports.getAllCustomers = (event, context, callback) => 
{
  return db.scan({
    TableName: customerTable
  }).promise().then(res =>{
    callback(null,response(200,res.Items.sort(sortByDate)))
  }).catch(err=>callback(null,response(err.statusCode,err)))
}

//Get customer
module.exports.getCustomer = (event, context, callback)=>
{
  const id = event.pathParameters.id;

  const params = {
    Key : {
      id: id
    },
    TableName:customerTable
  }
  return db.get(params).promise().then(res=>{
    if(res.Item) callback(null,response(200,res.Item))
    else callback(null, response(404,{error:"Customer not found"}))
  }).catch(err => callback(null,response(err.statusCode,err)));
}

//Update a customer
module.exports.updateCustomer = (event, context, callback)=>
{
  const id = event.pathParameters.id;
  const body = JSON.parse(event.body);

  var createdAt = body.createdAt;
  var firstname = body.firstname;
  var lastname = body.lastname;
  var password = body.password;
  var gender = body.gender;
  var email = body.email;
  var phone = body.phone;
  var adress = body.adress;
  var zipcode = body.zipcode;
  var country = body.country;
  var returningcustomer = body.returningcustomer;
  var admin = body.admin;

  const params = {
    Key:{
      id: id
    },
    TableName: customerTable,
    ConditionExpression: "attribute_exists(id)",
    UpdateExpression: "SET createdAt=:createdAt, firstname=:firstname, lastname=:lastname, password=:password, gender=:gender, email=:email, phone=:phone, adress=:adress, zipcode=:zipcode, country=:country, returningcustomer=:returningcustomer, admin=:admin",
    ExpressionAttributeValues: {
      ":createdAt":createdAt,
      ":firstname":firstname,
      ":lastname":lastname,
      ":password":password,
      ":gender":gender,
      ":email":email,
      ":phone":phone,
      ":adress":adress,
      ":zipcode":zipcode,
      ":country":country,
      ":returningcustomer":returningcustomer,
      ":admin":admin,
    },
    ReturnValue: "ALL_NEW"
  };
  return db.update(params).promise().then(res =>{
    callback(null,response(200,{message:"Successfully updated customer"}));
  }).catch(err => callback(null,response(err.statusCode,err)));
}

//Delete customer
module.exports.deleteCustomer = (event, context, callback)=>
{
  const id = event.pathParameters.id;
  const params = {
    Key: {
      id: id
    },
    TableName: customerTable
  };
  return db.delete(params).promise().then(()=>callback(null,response(200,{message:"Customer deleted successfully"})))
  .catch(err => callback(null, response(err.statusCode,err)));
}

//Check logindetails
module.exports.checkLogin = (event, context, callback)=>
{
  const reqBody = JSON.parse(event.body);
  var foundUser=false;
  var email = reqBody.email;
  var password = reqBody.password;
  db.scan({
    TableName: customerTable
  }).promise().then(res =>{
    var items=res.Items;
    for(var i = 0 ; i<items.length ; i++)
    {
      var obj=items[i];
      if(checkKeyValuePair(obj,'email',email)==true&&checkKeyValuePair(obj,'password',password)==true)
      {
        foundUser=true;
      }
    }
    if(foundUser==true)
    {
      callback(null,response(200,foundUser));
    }
    else
    {
      callback(null,response(404,foundUser));
    }
  }).catch(err => callback(null,response(err.statusCode.err)));
}
