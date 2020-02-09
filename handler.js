'use strict';
const AWS = require("aws-sdk")
const db = new AWS.DynamoDB.DocumentClient({apiVersion:"2012-08-10"})
const uuid = require("uuid/v4")

const custTable = process.env.CUSTOMERS_TABLE

//Create response
function response(statuscode,message)
{
  return {
    statusCode:statuscode,
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

//Create customer
module.exports.createCustomer = ( event, context, callback ) =>
{
  const reqBody = JSON.parse(event.body);
  
  //Check that atleast first and lastname exists
  if(!reqBody.firstname || reqBody.firstname.trim() ==="" || !reqBody.lastname || reqBody.lastname.trim() ==="")
  {
    return callback(null,response(400,{error:"Request must have firstname and lastname and cannot be empty"}))
  }

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
  return db.put
  ({
    TableName: customerTable,
    Item: customer
  }).promise().then(()=>{
    callback(null, response(201,customer))
  })
  .catch(err => response(null,response(err.statusCode,err)));
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
  const paramName = body.paramName;
  const paramValue = body.paramValue;

  const params = {
    Key:{
      id: id
    },
    TableName: customerTable,
    ConditionExpression: "attribute_exists(id)",
    UpdateExpression: "set "+paramName+" = :v",
    ExpressionAttributeValues: {
      ":v":paramValue
    },
    ReturnValue: "ALL_NEW"
  };
  return db.update(params).promise().then(res =>{
    callback(null,response(200,res.Attributes));
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