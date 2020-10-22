function isNontNegIntString(value, returnErrors=false) {
    errors = []; // assume no errors at first
    if(Number(value) != value) errors.push('Not a number!'); // Check if string is a number value
    if(q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if(parseInt(value) != value) errors.push('Not an integer!'); // Check that it is an integer

    return returnErrors ? errors : (errors.length == 0);
}

attributes = "Sam;19;19.5;" + (0.5 - 54);
pieces = attributes.split(";");

for(i in pieces) {
    console.log( `${pieces[1]} is not neg ${isNontNegIntString(pieces[i], true).join("***")}` );
}

