//Creating a server via express//
var data = require('./Public/product_data.js'); //get the data from product_data.js
var products = data.products;

var express = require('express'); //Server requires express to run//
var app = express(); //Run the express function and start express//
var myParser = require("body-parser");


app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path)
    next();
});

app.use(myParser.urlencoded({ extended: true }));
//to process the response from what is typed in the form
app.get("/process_form", function (request, response) {
   let GET = request.body;
   if (typeof GET['quantity_textbox'] != 'undefined') {
    displayPurchase(GET, response);
    
} 
});

function isNonNegInt(q, returnErrors = false) {
    errors = []; // assume that quantity data is valid 
    if (q == "") { q = 0; }
    if (Number(q) != q) errors.push('Not a number!'); //check if value is a number
    if (q < 0) errors.push('Negative value!'); //check if value is a positive number
    if (parseInt(q) != q) errors.push('Not an integer!'); //check if value is a whole number
    return returnErrors ? errors : (errors.length == 0);
 }
app.use(express.static('./Public')); //Creates a static server using express from the public folder
app.listen(8080, () => console.log(`listen on port 8080`))