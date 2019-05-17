// let isDone:boolean = true;
// console.log(isDone);

// let _name:string = 'bob';
// _name = 'smith';
// console.log(_name);

// let _name:string = `Gene`;
// let age:number = 37;
// let sentence:string = `hello,my name is ${_name}. i will be ${age} years old.`;
// console.log(sentence);

// let list:number[] = [1,2,3];
// let list2:Array<number> = [4,5,6];
// console.log(list,list2);

// let x:[string,number];
// x = ['hello',10];
// // x = [10,'hello'];
// x[3] = 'world';
// console.log(x[5].toString());
// x[6] = true;

// enum Color{red,green,blue}
// let c:Color = Color.blue;
// console.log(c);
// let colorName:string = Color[1];
// console.log(colorName);

// let notSure: any = 4;
// notSure = "maybe a string instead";
// notSure = false;

// let notSure: any = 4;
// notSure.ifItExists();
// notSure.toFixed();
// let prettySure:Object = 4;
// prettySure.toFixed();

// let list:any[] = [1,'100','free'];
// list[1] = 100;
// console.log(list);

// function warnUser():void{
//     console.log('This id my warning message');
// }
// warnUser();

// let someValue: any = "This is a string";
// let strLength: number = (<string>someValue).length;
// console.log(strLength);

// let someValue: any = "This is a stringdsvsdfgv";
// let strLength: number = (someValue as string).length;
// console.log(strLength);

// for(let i = 0;i<10;i++){
//     setTimeout(function(){
//         console.log(i);
//     },100*i);
// }

// for(var i = 0;i<10;i++){
//     (function(i){
//         setTimeout(function(){
//             console.log(i);
//         },100*i);
//     })(i)
// }

// let x = 20;
// let x = 10;

// function g(){
//     let x = 100;
//     // var x = 100;
// }

// function f(condition,x){
//     if(condition){
//         let x = 100;
//         return x;
//     }
//     return x;
// }
// console.log(f(false,0));
// console.log(f(true,0));

// function sumMatrix(matrix:number[][]){
//     let sum = 0;
//     for(let i = 0;i<matrix.length;i++){
//         var currentRow = matrix[i];
//         for(let i = 0;i<currentRow.length;i++){
//             console.log(sum);
//             sum += currentRow[i];
//         }
//     }
//     return sum;
// }
// console.log(sumMatrix([[1,2],[3,4],[5,6]]));

// function m(x:number){
//     let a = 10;
//     {
//         console.log(a);
//     }
// }
// m(5);

// let input = [1,2];
// let [first,second] = input;
// console.log([first,second]);
// [first,second] = [second,first];
// console.log([first,second]);

// let [first,...rest] = [1,2,3,4,5,6,[1,2,3]];
// console.log(first);
// console.log(rest);

// let [,second,,,fourth] = [1,2,3,4,6];
// console.log(second,fourth);

// let o = {
//     a:"foo",
//     b:12,
//     c:"bar"
// };
// let {a,b} = o;
// console.log({a,b});

// let first = [1,2];
// let second = [3,4];
// let bothPlus = [0,...first,...second,5];
// console.log(bothPlus);

// let defaults = {food:"spicy",price:"$$",ambiance:"noisy"};
// // let search = {...defaults,food:"rich"};
// let search = {food:"rich",...defaults};
// // console.log(search);
// console.log(search);
// console.log(defaults);

// class C{
//     p = 12;
//     m(){

//     }
// }
// let c = new C();
// let clone = {...c};
// console.log(clone);
// clone.p;

// function printLabel(labeolledObj:{label:string}):void{
//     console.log(labeolledObj.label);
// }
// let myObj = {size:10,label:"size 10 object"};
// printLabel(myObj);

// interface LabelledValue{
//     label:string;
// }
// function printLabel(labelledObj:LabelledValue):void{
//     console.log(labelledObj.label);
// }
// let myObj = {size:10,label:"size 10 object"};
// printLabel(myObj);

// interface SquareConfig{
//     color?:string;
//     width?:number;
// }

// interface Point{
//     readonly x:number;
//     readonly y:number;
// }
// let p1:Point = {x:10,y:20};
// p1.x = 5;

// let a:number[] = [1,2,3,4];
// let ro:ReadonlyArray<number> = a;
// a = ro as number[];
// console.log(a);
// console.log(ro);

// interface SquareConfig{
//     color?:string;
//     width?:number;
//     [propName:string]:any;
// }

// interface SearchFunc{
//     (source:string,substring:string):boolean;
// }

// interface StringArray{
//     [index:number]:string;
// }
// let myArray:StringArray;
// myArray = ["Bob","Fred"];
// let mystr:string = myArray[0];

// interface NumberDictionary{
//     [index:string]:number;
//     length:number;
//     // name:string;
// }

// interface ReadonlyStringArray{
//     readonly [index:number]:string;
// }
// let myArray:ReadonlyStringArray = ["Alice","Bob"];
// myArray[2] = "Mallory";

// interface ClockInterface{
//     currentTime:Date;
// }
// class Clock implements ClockInterface{
//     currentTime:Date;
//     constructor(h:number,m:number){

//     }
// }

// interface ClockInterface{
//     currentTime:Date;
//     setTime(d:Date);
// }
// class Clock implements ClockInterface{
//     currentTime:Date;
//     setTime(d:Date){
//         this.currentTime = d;
//     }
//     constructor(h:number,m:number){

//     }
// }

// interface ClockConstructor{
//     (hour:number,minute:number);
// }
// class Clock implements ClockConstructor{
//     currentTime:Date;
//     constructor(h:number,m:number){}
// }

// interface Counter{
//     (start:number):string;
//     interval:number;
//     reset():void;
// }

// class Greeter{
//     greeting:string;
//     constructor(message:string){
//         this.greeting = message;
//     }
//     greet(){
//         return "Hello, "+this.greeting;
//     }
// }
// let greeter = new Greeter('world');
// console.log(greeter);

// let deck = {
//     suits:["hearts","spades","clubs","diamonds"],
//     cards:Array(52),
//     createCardPicker:function(){
//         return function(){
//             // let pickedCard = Math.floor(Math.random()*52);
//             // let pickedSuit = Math.floor(pickedCard/13);
//             return ()=>{
//                 let pickedCard = Math.floor(Math.random()*52);
//                 let pickedSuit = Math.floor(pickedCard/13);
//                 return{
//                     suit:this.suits[pickedSuit],
//                     card:pickedCard%13
//                 }
//             }
//         }
//     }
// };
// let cardPicker = deck.createCardPicker();
// let pickedCard = cardPicker();
// console.log(pickedCard);

// function identity<T>(arg:T):T{
//     return arg;
// }
// let output = identity<string>('myString');
// console.log(output);

// function loggingIdentity<T>(arg:T[]):T[]{
//     console.log(arg.length);
//     return arg;
// }
// function loggingIdentity<T>(arg:Array<T>):Array<T>{
//     console.log(arg.length);
//     return arg;
// }

// interface G{
//     <T>(arg:T):T;
// }
// function identity<T>(arg:T):T{
//     return arg;
// }
// let myIdentity:G<number> = identity;
// console.log(myIdentity);

// class G<T>{
//     zeroValue:T;
//     add:(x:T,y:T) => T;
// }
// let myG = new G<number>();
// myG.zeroValue = 0;
// myG.add = function(x,y){
//     return x+y;
// }
// console.log(myG.add(3,5));

// function extend<T,U>(first:T,second:U):T&U{
//     let result = <T&U>{};
//     for(let id in first){
//         (<any>result)[id] = (<any>first)[id];
//     }
//     for(let id in second){
//         if(!result.hasOwnProperty(id)){
//             (<any>result)[id] = (<any>second)[id];
//         }
//     }
//     return result;
// }
// class Person{
//     constructor(public name:string){}
// }
// interface Loggable{
//     log():void;
// }
// class ConsoleLogger implements Loggable{
//     log(){
//         console.log('huxu');
//     }
// }
// var jim = extend(new Person("Jim"),new ConsoleLogger());
// console.log(jim);
// var n = jim.name;
// jim.log();

// let sym1 = Symbol();
// let sym2 = Symbol("key");
// console.log(sym1,sym2);

// let sym = Symbol();

// let obj = {
//     [sym]: "value"
// };
// console.log(obj[sym]);

// const getClassNameSymbol = Symbol();
// class C{
//     [getClassNameSymbol](){
//         return "C";
//     }
// }
// let c = new C();
// let className = c[getClassNameSymbol]();
// console.log(className);























































































