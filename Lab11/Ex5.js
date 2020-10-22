function isNontNegIntString(q, returnErrors=false) {
    errors = []; // assume no errors at first
    if(Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if(q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if(parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer

    return returnErrors ? errors : ( (errors.length > 0)? false:true);
}

myArray= "Sam;19;19.5;" + (0.5 - 54);
myArrah.forEach(function(item, index) {console.log(isNonNegInt(item, true))});
myArrah.forEach(function(item) {console.log( (typeof item == 'string' && item.length > 0)?true:false )});

function asyncFunction (callback) {
    setTimeout(callback, 1000, "I'm first!"); // passes to the callback
}

asyncFunction(function(param) {
    console.log(param)
});
console.log("No you're not!");

