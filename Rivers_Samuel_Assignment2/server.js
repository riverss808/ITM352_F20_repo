//isNonNegInt function was drawn from Lab 13
function isNonNegInt(q, returnErrors = false) {
    errors = []; // assume that quantity data is valid 
    if (q == "") { q = 0; } //this means that the blank values will be handle as if they were 0
    if (Number(q) != q) errors.push('<font color="red">This is Not a Number!</font>'); //check if value is a number
    if (q < 0) errors.push('<font color="red">This is a Negative Value!</font>'); //check if value is a positive number
    if (parseInt(q) != q) errors.push('<font color="red">This is Not an Integer!</font>'); //check if value is a whole number
    return returnErrors ? errors : (errors.length == 0);
 }
 
 //The following code allows for server side processing.
 //Resources Used: Lab 13
 const querystring = require('querystring');
 var express = require('express'); //code for server
 var myParser = require("body-parser"); //code for server
 var products = require("./public/product_list.js").products; //accessing data from javascript file
 var filename = 'user_data.json' //defines the array as an object 
 var fs = require('fs'); //pulls data from product_list.js
 var app = express();
 var qs = require('querystring'); //for the quantities to be carried over
 var qstr = {};
 var recordquantity = {};
 app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
 });

 app.use(myParser.urlencoded({ extended: true }));
 
 if (fs.existsSync(filename)) {
    stats = fs.statSync(filename) //this gets stats from the filename 
    data = fs.readFileSync(filename,'utf-8');
    console.log(typeof data);
    var users_reg_data = JSON.parse(data);
 
    console.log(`${filename} has ${stats.size} characters`);

 } else {
    console.log("Hey!" + filename + "doesn't exist!")
 }
 
 app.post("/process_form", function (request, response) {
    // checks for valid quantities
    // look up request.query
    console.log(request.body); 
    var params = request.body;
    if (typeof params['purchase_submit'] != 'undefined') {
       has_errors = false; // assume that quantity values are valid
       total_qty = 0; // check if there are values in the first place, so see if total > 0
       for (i = 0; i < products.length; i++) {
          console.log(i, params[`quantity${i}`]);
          if (typeof params[`quantity${i}`] != 'undefined') {
             a_qty = params[`quantity${i}`];
             total_qty += a_qty;
             if (!isNonNegInt(a_qty)) {
                has_errors = true; // see if there is invalid data
             }
          }
       }
       qstr = querystring.stringify(request.body);
       // redirect to invoice if quantity data is valid or respond to invalid data
       if (has_errors || total_qty == 0) {
          //redirect to products page if quantity data is invalid
          console.log("going to products page", has_errors, total_qty);
          response.redirect("/products_page.html?" + qstr);
       } else { //the quantity data is okay for the invoice
          console.log("going to login page");
          response.redirect("/login.html?" + qstr);
       }
    }
 });
 //if quantity data valid, send them to the login page
 //isNonNegInt function was drawn from Lab 13
 function isNonNegInt(q, returnErrors = false) {
    errors = []; // assume that quantity data is valid 
    if (q == "") { q = 0; } //this means that the blank values will be handle as if they were 0
    if (Number(q) != q) errors.push('This is Not a Number!'); //check if value is a number
    if (q < 0) errors.push('This is a Negative Value!'); //check if value is a positive number
    if (parseInt(q) != q) errors.push('This is Not an Integer!'); //check if value is a whole number
    return returnErrors ? errors : (errors.length == 0);
 }
 
 fs = require('fs'); // uses file system moduel
 
 //open file if it exists, if it doesn't don't open it
 if (fs.existsSync(filename)) {
    stats = fs.statSync(filename) //this gets stats from the filename 
    data = fs.readFileSync(filename,'utf-8');
    console.log(typeof data);
    users_reg_data = JSON.parse(data);
 }
 
 
     function isNonNegInt(q, return_errors = false) {
         errors = [];
         if (q == '') q = 0;
         if (Number(q) != q) errors.push('<font color="red">Please put a number.</font>'); //check if value is a number
         else if (q < 0) errors.push('<font color="red">Please put a positive value.</font>'); //check if value is a positive number
         else if (parseInt(q) != q) errors.push('<font color="red">Please put a whole number.</font>'); //check if value is a whole number
         return return_errors ? errors : (errors.length == 0);
     }
 
 app.post("/check_login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log(request.query, request.body);
    the_username = request.body.username;
    console.log(the_username, "username is", typeof (users_reg_data[the_username]));
    //validate login data
    theQuantQuerystring = qs.stringify(request.query);
    if (typeof users_reg_data[the_username] != 'undefined') {
       //To check if the username exists in the json data
       if (users_reg_data[the_username].password == request.body.password) {
          //make the query string of prod quant needed for invoice
          response.redirect('/invoice.html?' + theQuantQuerystring + `&username=${the_username}`);
          return;
       } else { 
          response.redirect('/login.html?' + theQuantQuerystring); // redirects to the login page when login was invalid
       }
    }
    response.send(`${username} registered!`); 
    response.redirect('/invoice.html?' + theQuantQuerystring + `&username=${the_username}`); // redirects to the login page when login was invalid
 });
 
 app.post("/register_user", function (request, response) {
    // process a simple register form
    console.log(request.query, request.body);
    the_username = request.body.username.toLowerCase();
    console.log(the_username, "username is", typeof (users_reg_data[the_username]));
 
    username = request.body.username;//saves new username to file name (users_reg_data)
 
    theQuantQuerystring = qs.stringify(request.query); // define querystring variable
 
   var errors = []; //to store all errors
   var nameerrors = []; //to store name errors
   var usererrors = []; //to store username errors
   var passerrors = []; //to store password errors
   var confirmerrors = []; //to store confirm password errors
   var emailerrors = []; //to store email errors
 
   //make sure name is valid
   if (request.body.name == "") { //if nothing is written for the name
     nameerrors.push('Invalid Full Name'); //push error to name errors
     errors.push('Invalid Full Name') //push error to array
   }
   //make sure that full name has no more than 30 characters
  // if ((request.body.name.length > 30)) { //if name length greater than 30 characters
   //  nameerrors.push('Full Name Too Long') //push error to name errors
   //  errors.push('Full Name Too Long') //push error to array
 //  }
   //make sure full name contains all letters
   if (/^[A-Za-z]+$/.test(request.body.name)) { //if there are only letters and numbers, do nothing
   }
   else { //if there isn't only letters and numbers
     nameerrors.push('Use Letters Only for Full Name') //push error to name errors
     errors.push('Use Letters Only for Full Name') //push error to array
   }
 
   //Username must be minimum of 4 characters and maximum of 10
   if ((request.body.username.length < 4)) { //if username is less than 4 characters, push an error
     usererrors.push('Username Too Short') //push to username errors array
     errors.push('Username Too Short') //push error to array
  }
   if ((request.body.username.length > 10)) { //if username is greater than 10 characters, push an error
     usererrors.push('Username Too Long') //push to username errors array
     errors.push('Username Too Long') //push error to array
   }
   //check if username exists
   var reguser = request.body.username.toLowerCase(); //make username user enters case insensitive
   if (typeof users_reg_data[reguser] != 'undefined') { //if the username is already defined in the registration data
     usererrors.push('Username is Already Taken. Please Enter a Different Username.') //push to username errors array
     errors.push('Username is Already Taken. Please Enter a Different Username.') //push error to array
   }
   //Check letters and numbers only
   if (/^[0-9a-zA-Z]+$/.test(request.body.username)) { //if there are only letters and numbers, do nothing
   }
   else { //if there are other things beside letters and numbers
     usererrors.push('Letters And Numbers Only for Username') //push to username errors
     errors.push('Letters And Numbers Only for Username') //push error to array
   }
 
   //check if password format is valid
   //check if password is a minimum of 6 characters long
   if ((request.body.password.length < 6)) { //if password length is less than 6 characters
     passerrors.push('Password Too Short') //push to password error array
     errors.push('Password Too Short') //push error to array
   }
   //check if password entered equals to the repeat password entered - make sure password is case sensitive
   if (request.body.password !== request.body.confirmpsw) { // if password equals confirm password
     confirmerrors.push('Password does not match! Please re-enter correct password') //push to confirm password array
     errors.push('Password does not match! Please re-enter correct password') //push error to array
   }
   //check if email is valid
   var regemail = request.body.email.toLowerCase(); // to make email case insensitive
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(regemail)) { 
   }
   else { //if email doesn't follow above criteria
     emailerrors.push('Invalid Email') //push to email errors array
     errors.push('Invalid Email') //push to errors array
   }
   if (nameerrors.length == 0) { //if no name errors
     console.log('no name errors!'); // to make sure if statement working
   }
   if (nameerrors.length > 0) { //if have name errors
     console.log('error:'+ nameerrors) //console log name errors
     request.query.nameerrors = nameerrors.join(';'); //joining name errors together
   }
 
   if (usererrors.length == 0) { //if no username errors
     console.log('no user errors!'); //to make sure if statement working
   }
   if (usererrors.length > 0) { //if have username errors
     console.log('error:'+ usererrors) //console log username errors
     request.query.usererrors = usererrors.join(';'); //joining username errors together
   }
 
   if (passerrors.length == 0) { //if have password errors
     console.log('no password errors!'); //to make sure if statement working
   }
   if (passerrors.length > 0) { //if have password errors
     console.log('error:'+ passerrors) //console log password errors
     request.query.passerrors = passerrors.join(';'); //joining password errors together
   }
   
   if (confirmerrors.length == 0) { //if have no errors with password confirmation
     console.log('no confirmation errors!'); //to make sure if statement working
   }
   if (confirmerrors.length > 0) { //if have password confirmation errors
     console.log('error:'+ confirmerrors); // console log password errors
     request.query.confirmerrors = confirmerrors.join(';'); //joining password confirmation errors together
   }
   if (emailerrors.length == 0) { //if there are no errors
     console.log('no email errors!'); // to confirm no email errors
   }
   if (emailerrors.length > 0) { //if there is more than 1 error
     console.log('error:'+ emailerrors); //console log email errors
     request.query.emailerrors = emailerrors.join(';'); //joining email errors together
   } 
   //if data is valid and no errors, save the data to the file and redirect to invoice
   if (errors.length == 0) { //if there are no errors
     console.log('none!'); //to double check if statement working
     request.query.username = reguser; //put username in querystring
     request.query.name = request.body.name; //put name into querystring
     // store information into a JSON file
  
     fs.writeFileSync(filename, JSON.stringify(users_reg_data));
     console.log(theQuantQuerystring, "going to invoice");
     res.redirect('./invoice.html?' + theQuantQuerystring + `&username=${the_username}`);
     return; //redirect to the invoice
   }
   //add errors to querystring (for purpose of putting back into textbox)
   else { //if there is one or more errors
     console.log(errors) //to double check if statement working
     request.query.name = request.body.name; //put name in querystring
     request.query.username = request.body.username; //put username in querystring
     request.query.password = request.body.password; //put password into querystring
     request.query.confirmpsw = request.body.confirmpsw; //put confirm password into querystring
     request.query.email = request.body.email; //put email back into querystring
 
     request.query.errors = errors.join(';'); //join all errors together into querystring
     console.log(errors);
     res.redirect('./register.html?' + theQuantQuerystring) //trying to add query from registration page and invoice back to register page on reload
   }
 }
 );
 
 app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
 });
 
 app.use(express.static('./public'));
 app.listen(8080, () => console.log(`listening on port 8080`));
 
 //Resources Used: Lab13 & Lab 14