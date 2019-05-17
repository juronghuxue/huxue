let first = [1,2];
let second = [3,4];
let bothPlus = [0,...first,...second,5];
console.log(bothPlus);
console.log('*****************************');

let defaults = {food:"spicy",price:"$$",ambiance:"noisy"};
let search = {...defaults,food:"rich"};
console.log(search);
console.log('*****************************');

function printLabel(labelledObject:{label:string}){
	console.log(labelledObj.label);
}
let myObj = {size:10,label:"size 10 object"};
printLabel(myObj);
















