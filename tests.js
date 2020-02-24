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

// Expect response to be JSON
pm.test("Response must be JSON", function () {
   pm.response.to.be.json;
});


// Expect response to have all the following fields
pm.test("Has all required fields", function () {
pm.expect(pm.response.text()).to.include("createdAt");
pm.expect(pm.response.text()).to.include("email");
pm.expect(pm.response.text()).to.include("country"); 
pm.expect(pm.response.text()).to.include("gender");
pm.expect(pm.response.text()).to.include("returningcustomer");
pm.expect(pm.response.text()).to.include("lastname");
pm.expect(pm.response.text()).to.include("zipcode");
pm.expect(pm.response.text()).to.include("password");
pm.expect(pm.response.text()).to.include("admin");
pm.expect(pm.response.text()).to.include("adress");
pm.expect(pm.response.text()).to.include("firstname");
pm.expect(pm.response.text()).to.include("id");
pm.expect(pm.response.text()).to.include("phone");
});




// GET - Single customer by ID
// Listing a specified customer

// Mock body
var body =  {
    "createdAt": "2020-02-18T11:58:54.799Z",
    "email": "jd@fake.com",
    "country": "Finland",
    "gender": "male",
    "returningcustomer": false,
    "lastname": "Doe",
    "zipcode": "00100",
    "password": "jd123",
    "admin": true,
    "adress": "Väggatan 1",
    "firstname": "John",
    "id": "4a970b99-e991-48b0-b97a-9439f3bdc951",
    "phone": "040002002002"
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
pm.test("Has all required fields", function () {
    pm.expect(pm.response.text()).to.include("createdAt");
    pm.expect(pm.response.text()).to.include("email");
    pm.expect(pm.response.text()).to.include("country"); 
    pm.expect(pm.response.text()).to.include("gender");
    pm.expect(pm.response.text()).to.include("returningcustomer");
    pm.expect(pm.response.text()).to.include("lastname");
    pm.expect(pm.response.text()).to.include("zipcode");
    pm.expect(pm.response.text()).to.include("password");
    pm.expect(pm.response.text()).to.include("admin");
    pm.expect(pm.response.text()).to.include("adress");
    pm.expect(pm.response.text()).to.include("firstname");
    pm.expect(pm.response.text()).to.include("id");
    pm.expect(pm.response.text()).to.include("phone");
});



// POST - Add customer

// Expect response to have a status code of 200 or 201
pm.test("Status code is OK", function () {
    pm.expect(pm.response.code).to.be.oneOf([200, 201]) ;
});

// Expect response to give a OK - status
pm.test("Status is ok", function () {
    pm.response.to.have.status("Created");
});

// Expect response to indicate content type
pm.test("Content-Type is present", function () {
      pm.response.to.have.header("Content-Type");
});
