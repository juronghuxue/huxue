var _a;
var input = [1, 2];
var first = input[0], second = input[1];
console.log(first);
console.log(second);
_a = [second, first], first = _a[0], second = _a[1];
console.log(first, second);
console.log('********************************');
function f(_a) {
    var first = _a[0], second = _a[1];
    console.log(first);
    console.log(second);
}
f([3, 4]);
var _b = [1, 2, 3, 4], one = _b[0], rest = _b.slice(1);
console.log(one);
console.log(rest);
console.log('********************************');
var o = {
    a: "foo",
    b: 12,
    c: "bar"
};
var a = o.a, b = o.b;
console.log(a);
console.log(b);
