/*
# These tests are to be run with Postman
# From AWS API Gateway, export current stage as POSTMAN Extension (JSON)
# Import the JSON File to Postman and run the tests
# Tests require an API Key, add it from the Authorization tab in POSTMAN
# Key name: X-API-Key
# (You have to request for an API-Key)
# Base URL:
# https://7hxuxvgjn2.execute-api.eu-central-1.amazonaws.com/dev
# /customers        - for all customers,        [ GET ]
# /customer/:id     - for a specified customer  [ GET ]
# /customer         - to add a customer         [ POST ]
*/



// GET - Customers
// Listing all customers

// GET - Customers
// Listing all customers

// Expect response to have a status code of 200
pm.test("Status code is 200", function() {
    pm.response.to.have.status(200);
});

// Expect response to give a OK - status
pm.test("Status is ok", function() {
    pm.response.to.have.status("OK");
});

// Expect response to indicate content type
pm.test("Content-Type is present", function() {
    pm.response.to.have.header("Content-Type");
});


// ID
pm.test("All items have ID", function() {
    let jsonData = pm.response.json();
    jsonData.forEach(item => {
        pm.expect(item.id).to.exist;
        pm.expect(item.phone).to.not.be.null;
    });
});
// Email
pm.test("All items have Email", function() {
    let jsonData = pm.response.json();
    jsonData.forEach(item => {
        pm.expect(item.email).to.exist;
        pm.expect(item.email).to.not.be.null;
    });
});

// Returningcustomer
pm.test("All items have returningcustomer", function() {
    let jsonData = pm.response.json();
    jsonData.forEach(item => {
        pm.expect(item.returningcustomer).to.exist;
        pm.expect(item.returningcustomer).to.not.be.null;
    });
});

// Firstname
pm.test("All items have firstname", function() {
    let jsonData = pm.response.json();
    jsonData.forEach(item => {
        pm.expect(item.firstname).to.exist;
        pm.expect(item.firstname).to.not.be.null;
    });
});

// Lastname
pm.test("All items have lastname", function() {
    let jsonData = pm.response.json();
    jsonData.forEach(item => {
        pm.expect(item.lastname).to.exist;
        pm.expect(item.lastname).to.not.be.null;
    });
});

// Country
pm.test("All items have Country", function() {
    let jsonData = pm.response.json();
    jsonData.forEach(item => {
        pm.expect(item.country).to.exist;
        pm.expect(item.country).to.not.be.null;
    });
});

// Phone
pm.test("All items have Phone", function() {
    let jsonData = pm.response.json();
    jsonData.forEach(item => {
        pm.expect(item.phone).to.exist;
        pm.expect(item.phone).to.not.be.null;
    });
});

// Created at
pm.test("All items have created at", function() {
    let jsonData = pm.response.json();
    jsonData.forEach(item => {
        pm.expect(item.createdAt).to.exist;
        pm.expect(item.createdAt).to.not.be.null;
    });
});


// Gender
pm.test("All items have gender", function() {
    let jsonData = pm.response.json();
    jsonData.forEach(item => {
        pm.expect(item.gender).to.exist;
        pm.expect(item.gender).to.not.be.null;
});
});


// Zip code
pm.test("All items have zipcode", function() {
    let jsonData = pm.response.json();
    jsonData.forEach(item => {
        pm.expect(item.zipcode).to.exist;
        pm.expect(item.zipcode).to.not.be.null;
});
});


// Password
pm.test("All items have password", function() {
    let jsonData = pm.response.json();
    jsonData.forEach(item => {
        pm.expect(item.password).to.exist;
        pm.expect(item.password).to.not.be.null;
});
});


// Admin
pm.test("All items have admin", function() {
    let jsonData = pm.response.json();
    jsonData.forEach(item => {
        pm.expect(item.admin).to.exist;
        pm.expect(item.admin).to.be.oneOf([true,false]);
        pm.expect(item.admin).to.not.be.null;
});
});


// Address
pm.test("All items have address", function() {
    let jsonData = pm.response.json();
    jsonData.forEach(item => {
        pm.expect(item.address).to.exist;
        pm.expect(item.address).to.not.be.null;
});
});




// GET - Single customer by ID
// Listing a specified customer

// Mock body
var body =  {
    "createdAt": "2020-03-05T13:23:51.221Z",
    "email": "mickep@fake.com",
    "country": "Finland",
    "gender": "Male",
    "returningcustomer": false,
    "lastname": "Pettersson",
    "zipcode": "00100",
    "password": "Mp123",
    "admin": true,
    "adress": "Stigvägen 12",
    "firstname": "Micke",
    "id": "77913674-2a7f-4a74-9123-66861d9e2f2b",
    "phone": "2903819031"
};

// Expect response to have a status code of 200
pm.test("Status code is 200", function () {
pm.response.to.have.status(200);
});

// Expect response to give a OK - status
pm.test("Status is ok", function () {
pm.response.to.have.status("OK");
});

// Expect response to indicate content type
pm.test("Content-Type is present", function () {
pm.response.to.have.header("Content-Type");
});

// Expect response body to have same format as mock body
pm.test("Body has correct format", function () {
pm.response.to.have.body(JSON.stringify(body));
});

// Expect response to be JSON
pm.test("Response must be JSON", function () {
pm.response.to.be.json;
});
// Expect response to have all the following fields
pm.test("Item should have ID", function() {
let jsonData = pm.response.json();
pm.expect(jsonData.id).to.exist;
pm.expect(jsonData.phone).to.not.be.null;

});
// Email
pm.test("Item should have Email", function() {
let jsonData = pm.response.json();
pm.expect(jsonData.email).to.exist;
pm.expect(jsonData.email).to.not.be.null;
});

// Returningcustomer
pm.test("Item should have returningcustomer", function() {
let jsonData = pm.response.json();
pm.expect(jsonData.returningcustomer).to.exist;
pm.expect(jsonData.returningcustomer).to.not.be.null;
});

// Firstname
pm.test("Item should have firstname", function() {
let jsonData = pm.response.json();
pm.expect(jsonData.firstname).to.exist;
pm.expect(jsonData.firstname).to.not.be.null;
});

// Lastname
pm.test("Item should have lastname", function() {
let jsonData = pm.response.json();
pm.expect(jsonData.lastname).to.exist;
pm.expect(jsonData.lastname).to.not.be.null;
});

// Country
pm.test("Item should have Country", function() {
let jsonData = pm.response.json();
pm.expect(jsonData.country).to.exist;
pm.expect(jsonData.country).to.not.be.null;
});

// Phone
pm.test("Item should have Phone", function() {
let jsonData = pm.response.json();
pm.expect(jsonData.phone).to.exist;
pm.expect(jsonData.phone).to.not.be.null;
});

// Created at
pm.test("Item should have created at", function() {
let jsonData = pm.response.json();
pm.expect(jsonData.createdAt).to.exist;
pm.expect(jsonData.createdAt).to.not.be.null;
});


// Gender
pm.test("Item should have gender", function() {
let jsonData = pm.response.json();
pm.expect(jsonData.gender).to.exist;
pm.expect(jsonData.gender).to.not.be.null;
});


// Zip code
pm.test("Item should have zipcode", function() {
let jsonData = pm.response.json();
pm.expect(jsonData.zipcode).to.exist;
pm.expect(jsonData.zipcode).to.not.be.null;
});


// Password
pm.test("Item should have password", function() {
let jsonData = pm.response.json();
pm.expect(jsonData.password).to.exist;
pm.expect(jsonData.password).to.not.be.null;
});


// Admin
pm.test("Item should have admin", function() {
let jsonData = pm.response.json();
pm.expect(jsonData.admin).to.exist;
pm.expect(jsonData.admin).to.be.oneOf([true,false]);
pm.expect(jsonData.admin).to.not.be.null;
});


// Address
pm.test("Item should have address", function() {
let jsonData = pm.response.json();
pm.expect(jsonData.adress).to.exist;
pm.expect(jsonData.adress).to.not.be.null;
});



// POST - Add customer

// Expect response to have a status code of 400, (Email in use)
pm.test("Throw email already in use error", function () {
    pm.expect(pm.response.code).to.be.oneOf([400]) ;
});

// Expect response to indicate content type
pm.test("Content-Type is present", function () {
      pm.response.to.have.header("Content-Type");
});