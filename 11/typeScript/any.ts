let notSure:any = 4;
console.log(notSure);
notSure = "maybe a string instead";
console.log(notSure);
notSure = false;
console.log(notSure);
console.log('**************************');

let prettySure:Object = 4;
prettySure.toFixed();

let list:any[] = [1,true,"free"];
list[1] = 100;
console.log(list);
console.log('**************************');


function warnUser():void{
	console.log("This is my warning message");
}
let unusable:void = undefined;

let someValue:any = "this is a string";
let strLength:number = (<string>someValue).length;
console.log(strLength);