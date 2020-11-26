// Samuel Rivers
// Referencing Code from the following: Lab 13

// Referencing Lab13 Exercise 4
// Utilization of Express
var express = require('express'); 
// Retrieves Express
var app = express();
var myParser = require("body-parser");
var fs = require('fs');
// Retrieves Products from /products.json
var products = require('./products.json'); 
var filename = 'user_data.json'

// Querystring becomes Info for Invoice
var qs = require('querystring');  

app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

// Gained help from Meghan Nagai & Kevin Nguyen
app.get("/get_products", function (request, response) {
// Defines "/get_products"; process_quantity_form(request.body, response);   
    response.type('.js');
    // Retrieves JSON String from URL
    console.log(" var products = " + JSON.stringify(products) + ";"); 
    // Sends the JSON String through
    response.send(" var products = " + JSON.stringify(products) + ";");
});

app.use(myParser.urlencoded({ extended: true }));

// Code for processing login/registration: helped by Alvin Amira, Meghan Nagai, and Kevin Nguyen
// Checking filename user_data.json
if (fs.existsSync(filename)) {
    stats = fs.statSync(filename);
    var data = fs.readFileSync(filename, 'utf-8');
    var users_reg_data = JSON.parse(data);
// If user does not exist, give error
} else {
    console.log(`ERR: ${filename} does not exist!`);
}
// User Login Form
app.post("/login_form", function (req, res) {
    var LogError = [];
    console.log(req.body);
    the_username = req.body.username.toLowerCase();
// Ensuring that username is lowercase
    if (typeof users_reg_data[the_username] != 'undefined') {
    if (req.body.password == users_reg_data[req.body.username].password) { 
// Redirects User to Invoice after Successful Login
    res.redirect('./invoice.html?' + purchase_qs);
    } else { 
// If Invalid Passowrd, User is notified
        LogError.psuh = ('Invalid Password');
        console.log(LogError);
        req.query.username = the_username;
        req.query.name = users_reg_data[the_username].name;
        req.query.LogError = LogError.join(';');
        }
    } else { 
// If Invalid Username, User is notified
        LogError.push = ('Invalid Username');
        console.log(LogError);
        req.query.username = the_username;
        req.query.LogError = LogError.join(';')
    }
    res.redirect('./login.html?' + purchase_qs);
});

// Creating an Account through Registration
app.post("/process_register", function (req, res) {
    var errors = [];
    var reguser = req.body.username.toLowerCase();
// Notifies user if Username is taken already
    if (typeof users_reg_data[reguser] != 'undefined') {
        errors.push('Username Taken')
    }
// Only letters can be used for Full Name
    if (/^[A-Za-z]+$/.test(req.body.name)) { 
    }
// Notifies User of Error
    else {
        errors.push('Use Only Letters for Full Name');
    }
// Full Name is Validated
    if (req.body.name == "") {
        errors.push('Invalid Full Name');
    }
// Full name length between 0 and 30 Letters
    if ((req.body.fullname.length > 30 && req.body.fullname.length < 0)) {
        errors.push('Full Name Too Long');
    }

// User can only utilize letters and numbers 
    if (/^[0-9a-zA-Z]+$/.test(req.body.username)) {
    }
// Notified if other characters are entered
    else {
        errors.push('Letters And Numbers Only for Username')
    }
// Password must be longer than 6 characters
    if (req.body.password.length < 6) {
        errors.push('Password Too Short')
    }
// The two passwords should be the same
    if (req.body.password !== req.body.repeat_password) {
        errors.push('Password Not a Match')
    }
// Referencing Lab 14
// User data is saved under user_data.json
    if (errors.length == 0) {
        POST = req.body
        console.log('no errors')
        var username = POST['username'];
        users_reg_data[username] = {}; 
// Users data is saved - username, password, & email
        users_reg_data[username].name = username;
        users_reg_data[username].password = POST['password'];
        users_reg_data[username].email = POST['email'];
        data = JSON.stringify(users_reg_data); 
// User written on invoice and saved
        fs.writeFileSync(filename, data, "utf-8");
        res.redirect('./invoice.html?' + purchase_qs);
    }
// If there is an error, User does not go to Invoice
    if (errors.length > 0) {
        console.log(errors)
        req.query.name = req.body.name;
        req.query.username = req.body.username;
        req.query.password = req.body.password;
        req.query.repeat_password = req.body.repeat_password;
        req.query.email = req.body.email;
// Redirect User to Registration page
        req.query.errors = errors.join(';');
        res.redirect('register.html?' + purchase_qs);
    }
});

 //console.log(request.body); 
app.post("/process_form", function (request, response, next) { 

// Referenced Code from Lab 13
// Check fo see if Input is Non-Negative Integer or Empty
// Check to see if Valid
    var validqty = true;   
// Check if there are inputs or blanks
    var totlpurchases = false;
    for (i = 0; i < products.length; i++) {
        aqty = request.body[`quantity${i}`];
// Invalid data 
        if (isNonNegIntString(aqty) == false) {
            validqty &= false; 
        }
// No input and/or left blank
        if (aqty > 0) { 
            totlpurchases = true;
        }
    }

// Creation of querystring for Invoice Page 
    purchase_qs = qs.stringify(request.body);
// If data is valid, User is sent to Login Page
    if (validqty == true && totlpurchases == true) {
        response.redirect('./login.html?' + purchase_qs);
    }
// If data is invalid, page is reloaded to Index
    else {
        response.redirect("./index.html?");
    }
});

app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));

// Reference Code from Lab13 and Assignment1 Example
function isNonNegIntString(string_to_check, returnErrors = false) {
// Function returns true if string_to_check is a non-negative integer
// No Errors are Assumed
    errors = []; 
    if (string_to_check == '') string_to_check = 0;
// Check if string is a number value
    if (Number(string_to_check) != string_to_check) { errors.push('Not a number!'); } 
    else {
// Check if string is non-negative
        if (string_to_check < 0) errors.push('Negative value!'); 
// Check that it is an integer
        if (parseInt(string_to_check) != string_to_check) errors.push('Not an integer!'); 
    }

    return returnErrors ? errors : ((errors.length > 0) ? false : true);
}
