let input = [1,2];
let [first,second] = input;
console.log(first);
console.log(second);
[first,second] = [second,first];
console.log(first,second);
console.log('********************************');


function f([first,second]:[number,number]){
	console.log(first);
	console.log(second);
}
f([3,4]);



let [one,...rest] = [1,2,3,4];
console.log(one);
console.log(rest);
console.log('********************************');


let o = {
	a:"foo",
	b:12,
	c:"bar"
};
let {a,b} = o;
console.log(a);
console.log(b);
