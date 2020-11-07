// Via Express, Server is Formulated
var data = require('./Public/product_list.js'); 
// Data received from products_list.js
var products = data.products;

var express = require('express');
// Require Express for Server to Run
var app = express(); 
// Start Express
var myParser = require("body-parser");

// Referenced back from Assignment 1
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path)
    next();
});

// Useing myParser for App.Use (Referecne Assigment 1)
app.use(myParser.urlencoded({ extended: true }));
// Processing the form from the server request
app.get("/process_form", function (request, response) {
   let GET = request.body;
   if (typeof GET['quantity_textbox'] != 'undefined') {
    displayPurchase(GET, response);
    
} 
});

function isNonNegInt(q, returnErrors = false) {
    errors = [];
// Assuming that it is valid with No Errors
    if (q == "") { q = 0; }
    if (Number(q) != q) errors.push('Not a number!');
    // If Value is not a Number
    if (q < 0) errors.push('Negative value!');
    // If Value is not a Positive Number
    if (parseInt(q) != q) errors.push('Not an integer!');
    // If Value is not a Whole Number (Cannot Sell Half a Case)
    return returnErrors ? errors : (errors.length == 0);
 }
app.use(express.static('./Public')); 
// Creates a Server that references the Public Folder
app.listen(8080, () => console.log(`listen on port 8080`))
// Listen on Port 8080 because that is what the class is hosted on