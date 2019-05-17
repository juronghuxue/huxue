
let z = 100;
function addToZ(x,y){
	return x+y+z;
}
console.log(addToZ(1,2));
console.log('***************************');

function add(x:number,y:number):number{
	return x+y;
}
console.log(add(1,2));
console.log('****************************');

let myAdd:(x:number,y:number)=>number = function(x:number,y:number):number{return x+y;}


function buildName(firstName:string,lastName="Smith"){
	return firstName+' '+lastName;
}
let results3 = buildName('Bob','Admas');
console.log(results3);
console.log('*****************************');

function buildName2(firstName:string,...restOfName:string[]){
	return firstName+" "+restOfName.join(" ");
}
let employeeName = buildName2("Joseph","Samuel", "Lucas", "MacKinzie");
console.log(employeeName);
console.log('********************************');










