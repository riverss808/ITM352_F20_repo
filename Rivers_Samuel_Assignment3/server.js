// Samuel Rivers Assignment 3
// Referenced and Borrowed Code from Assignment 3 Examples (Professor Port), Assignment 2, and w3source.com
// Gained help from Kevin Nguyen, Alvin Amira, and Meghan Nagai

var product_data = require('./public/product_data.js'); // places product_data into variable
var app = express(); // loads express into bariable
var myParser = require("body-parser"); // loads body parser into variable, referencing from Assignment 2
const querystring = require('querystring'); // loads querystring into variable
var fs = require('fs'); // loads file system into variable

// Directly Referencing Lab 15 and Assignment 3 Example
var cookieParser = require('cookie-parser') // establishes cookie parser for security & expiration
var session = require('express-session'); // established sessesion so multiple people can sign
const user_data_filename = 'userdata.json'; // references userdata.json to retrieve user data
const nodemailer = require("nodemailer"); // will utilize nodemailer to send emails after invoice

// Directly borrowed and referencing Assignment 3 examples
app.use(session({secret: "ITM352 rocks!"})); // automatically sets up the use of sessions
app.use(cookieParser());
app.use(myParser.urlencoded({ extended: true }));
app.use(myParser.json());

// If file name exists, the console will log and read the amount of characters to permit the user
if(fs.existsSync(user_data_filename)) {
    stats = fs.statSync(user_data_filename);
    console.log(`user_data.json has ${stats['size']} characters`);
    var data = fs.readFileSync(user_data_filename, 'utf-8');
    users_reg_data = JSON.parse(data);
}

// Directly referencing Assignment 3 example
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path); // utilizing request method and request path
    next(); // initiates continuation
});

// Referencing Assignment 2 code for Login
app.post("/process_login", function (request, response) {
    POST = request.body;
    if(typeof users_reg_data[request.body.username] != 'undefined') {
        if(request.body.password == users_reg_data[request.body.username].password) {
            if (typeof request.session.login == 'undefined') {
                request.session.login = {};
            }
            if (typeof request.session.login.username == 'undefined') {
                request.session.login.username = [POST.username];
            }
            if (typeof request.session.login.password == 'undefined') {
                request.session.login.password = [POST.password];
            }
          console.log(request.session);

          var user_email = users_reg_data[request.body.username].email;
// Utilizing cookies so that it will eventually expire
          response.cookie('username', POST.username);
          response.cookie('email', user_email);
          response.redirect("./index.html");
// If password does not match, then send response
        } else {
            response.send(`${request.body.password} doesn't match what we have for you!`)
        }
// If user data does not even exist, then send response
    } else {
    response.send(`${user_data_filename} does not exist`);
}
});

// Referencing Assignment 2 for Registration Page
app.post("/process_registration", function (request, response) {

    let POST = request.body;
// first assume that there are no errors
    var errors = [];

// If statement to validate user data
// Check to see if username exists in userdata.json
    if (typeof   users_reg_data[request.body.newuser.toLowerCase] != 'undefined') { 
        errors.push("Username already exists");
// If username already exists, then push "Username Exists!"
    }
// If username is less than 4 characters long, push error
    if (request.body.newuser.length < 4) { 
        errors.push("Username is too short!");
    }
// If username is more than 25 characters long, push error
    if (request.body.newuser.length > 25) { 
        errors.push("Username is too long!");
    }
// If username has characters other than letters/numbers, push error
    if ((/^[0-9a-zA-Z]+$/).test(request.body.newuser) == false) { // Referencing w3resource.com
        errors.push("Username can only contain letters or numbers!"); 
    }

// If full name is more than 30 characters long, push errors
    if (request.body.newfullname.length > 30) { 
        errors.push("Name is too long!");
    }
// If full name contains characters beside letters, push error
    if (/^[A-Za-z]+$/.test(request.body.name)) { // (code from w3resource.com and Assignment 2), gained help from Kevin Nguyen
    } else {
        errors.push("Name can only contain letters!");
    }
// If password is less than 6 characters long, push error
    if (request.body.newpass.length < 6) { 
        errors.push("Password is too short!");
    }
// If password confirm does not match password, push error
    if (request.body.newpass != request.body.newpass_confirm) { 
        errors.push("Password confirmation does not match!");
    }
// If there are no errors in registration, validate data and let POST
    if (errors.length == 0) { 
        let POST = request.body;

//If all passes and is validated, send data to userdata.json to be stored & saved
        username = POST['newuser'];
          users_reg_data[username] = {};
          users_reg_data[username].name = POST['newfullname'];
          users_reg_data[username].password = POST['newpass'];
          users_reg_data[username].email = POST['newemail'];
// Parse and store new user data in reg_info_str
        reg_info_str = JSON.stringify(  users_reg_data); 
// Adds to the file
        fs.writeFileSync(user_data_filename, reg_info_str, "utf-8"); 
// Requests quantities from query string
        query_string_object = request.query; 
    // Obtains username string
            query_string_object["username"] = username; 
            console.log(request);
    // Redirects to cart & invoice with the two strings
            response.redirect("./cart.html"); 
    } else {
    // If not, sends user back to registartion
        response.redirect("./registration.html");
    }
});

// Directly referencing and borrowing from Assignment 3 Examples
app.post("/add_to_cart", function (request, response) {
// When add_to_cart is clicked, the quantity will be sent to cart and invoice which is directly tied to the user's session
    var POST = request.body
    console.log(POST);

// If quantity inputted has no errors, quantity is pushed to the session   
    has_errors = false;
    qty = POST[`quantity`];
    if (qty != '' && isNonNegIntString(qty) == true) {

// If there are errors, then error is presented
        if (has_errors == false) {
            if (typeof request.session.cart == 'undefined') {
                request.session.cart = {};
            }
            if (typeof request.session.cart[POST.product_key] == 'undefined') {
                request.session.cart[POST.product_key] = [];
            }
            request.session.cart[POST.product_key][POST.product_index] = Number.parseInt(POST.quantity);
            response_msg = `Added ${POST.quantity} to your cart!`;
        }
// Response message is said when quantity is valid
        response_msg = `Added ${POST.quantity} to your cart!`;
        console.log(request.session);
        response.json({"message":response_msg});
// If not, error message sent
} else {
        has_errors = true;
        console.log("errors");
        ;   
    };
});

// Referencing Assignment 3 Example, gained help from Meghan Nagai for understanding sessions
app.post("/get_cart_data", function (request, response) {
    if (typeof request.session.cart == 'undefined') {
        request.session.cart = {};
    }
    response.json(request.session.cart);
});
// Retrieves login data
app.post("/get_login_data", function (request, response) {
    if (typeof request.session.login == 'undefined') {
        request.session.login = {};
        console.log(request.session.login)
    }
    response.json(request.session.login);

});

// When user clicks invoice button
app.post("/go_to_invoice", function (request, response) {
    console.log(request.session.cart);
// User must be logged in or registered in order to access invoice
    if (typeof request.session.login == 'undefined') {
        alertstr = `<script> alert("Please login or register to complete purchase!");
                        window.history.back() </script>`;

            response.send(alertstr);     
    }
// When logged in, the user can access invoice. If not, alert sent.
    response.redirect("./invoice.html")
});

// Referencing and borrowing code form Assignment 3 Examples
app.post("/complete_order", function (request, response) {

    var invoice_str = `Thank you for your order! `;

    var transporter = nodemailer.createTransport({
        host: "mail.hawaii.edu",
        port: 25,
        secure: false, // Utilizing TLS on class server
        tls: {
// does not fail on invalid certs
          rejectUnauthorized: false
        }
      });
 // Sent from my personal UH email   
      var user_email = request.cookies.email;
      console.log(user_email);
      var mailOptions = {
        from: 'riverss@hawaii.edu',
        to: user_email,
// Subject line is the Invoice
        subject: 'Your Invoice',
        html: invoice_str
      };
    
      transporter.sendMail(mailOptions, function(error, info){
// If there is an error, message is sent
        if (error) {
            invoice_str += '<br>Due to an error, your email could not be emailed';
// If email is valid, message is successfully sent along with invoice
        } else {
            invoice_str += `<br>Your invoice was mailed to ${user_email}`;
        }
        response.send(invoice_str);
      });
})

// Logout button (Gained help from Kevin Ngyuen and Alvin Amira)
// The cookie and session are destroyed & cleared
app.post('/logout', function (request, response) { 
    request.session.destroy(); 
    response.clearCookie("username");
    response.clearCookie("email");
    response.redirect('/index.html');
});

// Referencing ITM352 Lab 12 and Assignment 2 Quantity Errors
 function isNonNegIntString(string_to_check, returnErrors = false) {
// Assume there are no errors at first
    errors = [];
// Check to see if quantity is a number
    if (Number(string_to_check) != string_to_check) { errors.push('<font color = "red">Not a number!</font color = "red">'); } 
    else { 
// Check to see if it is a negative value or not, sends error
        if (string_to_check < 0) { errors.push('<font color = "red">Negative value!</font color = "red">'); } 
// Check if quantity is a non-integer, pushes error if so
        if (parseInt(string_to_check) != string_to_check) { errors.push('<font color = "red">Not an integer!</font color = "red">'); } 
    }
// If no errors, do not push error message
    return returnErrors ? errors : (errors.length == 0); 
}

// Referencing ITM352 Lab 12 and Assignment 2 error message
function checkQuantityTextbox(theTextbox) {
    errs = isNonNegIntString(theTextbox.value, true);
// If there are no errors, replace with "You want", makes it more personalized
    if (errs.length == 0) errs = ['You want:']; 
    if (theTextbox.value.trim() == '') errs = ['Quantity'];
// Exhibits errors if there are invalid quantities
    document.getElementById(theTextbox.name + '_label').innerHTML = errs.join(" ");  
}

// Searches for files in the public folder/directory
app.use(express.static('./public')); 
// starts listening for requests on port 8080 for the class server
app.listen(8080, () => console.log(`listening on port 8080`)); 
