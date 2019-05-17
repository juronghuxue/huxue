var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var first = [1, 2];
var second = [3, 4];
var bothPlus = [0].concat(first, second, [5]);
console.log(bothPlus);
console.log('*****************************');
var defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
var search = __assign({}, defaults, { food: "rich" });
console.log(search);
console.log('*****************************');
function printLabel(labelledObject) {
    console.log(labelledObj.label);
}
var myObj = { size: 10, label: "size 10 object" };
printLabel(myObj);
