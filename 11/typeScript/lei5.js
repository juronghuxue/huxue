var GenericNumber = /** @class */ (function () {
    function GenericNumber() {
    }
    return GenericNumber;
}());
var myG = new GenericNumber();
myG.zeroValue = "hu ";
myG.add = function (x, y) { return x + y; };
console.log(myG.add(myG.zeroValue, "xu"));
