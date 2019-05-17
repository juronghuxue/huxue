class GenericNumber<T>{
	zeroValue:T;
	add:(x:T,y:T) => T;
}
let myG = new GenericNumber<string>();
myG.zeroValue = "hu ";
myG.add = function(x,y){return x+y}
console.log(myG.add(myG.zeroValue,"xu"));
console.log('******************************');

function logging<T>{}



















