const fs = require('fs');

const user_data_filename = 'user_data.json';

// check if file exists before reading
if( fs.existsSync(user_data_filename) ) {
    stats = fs.statSync(user_data_filename);
    console.log(`user_data_.json has ${stats['size']} characters`);

var data = fs.readFileSync(user_data_filename, 'utf-8');
} else {
    console.log(`ERR: ${user_data_filename} does not exist!!!`);
}

app.use(myParser.urlencoded({ extended: true }));

app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
 });

app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log(request.body);

});

app.listen(8080, () => console.log(`listening on port 8080`));


users_reg_data = JSON.parse(data);

// console.log(users_reg_data, typeof users_reg_data, typeof data);

// if user exists, get their password
if(typeof users_reg_data['itm352'] != 'undefined') {
    console.log(typeof users_reg_data['itm352']['password']=='xxx');
}

app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log("Got a POST login request");
    POST = request.body;
    user_name_from_form = POST["username"];
    console.log("User name from form=" + user_name_from_form);
    if (user_data[user_name_from_form] != undefined) {
        response.send(`<H3> User ${POST["username"]} logged in`);
    } else {
        response.send(`Sorry`);
    }
});