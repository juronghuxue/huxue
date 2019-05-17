var z = 100;
function addToZ(x, y) {
    return x + y + z;
}
console.log(addToZ(1, 2));
console.log('***************************');
function add(x, y) {
    return x + y;
}
console.log(add(1, 2));
console.log('****************************');
var myAdd = function (x, y) { return x + y; };
function buildName(firstName, lastName) {
    if (lastName === void 0) { lastName = "Smith"; }
    return firstName + ' ' + lastName;
}
var results3 = buildName('Bob', 'Admas');
console.log(results3);
console.log('*****************************');
function buildName2(firstName) {
    var restOfName = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        restOfName[_i - 1] = arguments[_i];
    }
    return firstName + " " + restOfName.join(" ");
}
var employeeName = buildName2("Joseph", "Samuel", "Lucas", "MacKinzie");
console.log(employeeName);
