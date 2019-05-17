// function printLabel(labelledObj:{label:string}){
//     console.log(labelledObj.label);
// }
// let myObj = {
//     size:10,
//     label:"huxu"
// };
// printLabel(myObj);

// interface LabelValue{
//     label:string;
// }
// function printLabel(labelledObj:LabelValue){
//     console.log(labelledObj.label);
// }
// let myObj = {
//     size:10,
//     label:"huxu"
// }
// printLabel(myObj);

// interface SquareConfig{
//     color?:string;
//     width?:number;
// }
// function createSquare(config:SquareConfig):{color:string;area:number}{
//     let newSquare = {
//         color:"white",
//         area:100
//     };
//     if(config.color){
//         newSquare.color = config.color;
//     }
//     if(config.width){
//         newSquare.area = config.width*config.width;
//     }
//     return newSquare;
// }
// let mySquare = createSquare({color:"black"});
// console.log(mySquare);

// interface Point{
//     readonly x:number;
//     readonly y:number;
// }
// let p1:Point = {
//     x:10,
//     y:20
// }
// p1.x = 5;
// console.log(p1);

// let a:number[] = [1,2,3,4];
// let ro:ReadonlyArray<number> = a;
// let a1:number[] = [1,2,3,4];
// let ro1:ReadonlyArray<number> = [1,2,3,4];
// // a = ro;
// a = ro as number[];

// interface SquareConfig{
//     color?:string;
//     width?:number;
//     [propName:string]:any;
// }
// function createSquare(config:SquareConfig):{color:string;area:number}{
//     let newSquare = {color:"white",area:100};
//     if(config.color){
//         newSquare.color = config.color;
//     }
//     if(config.width){
//         newSquare.area = config.width*config.width;
//     }
//     return newSquare;
// }
// let mySquare:SquareConfig = createSquare({colour:"black",width:20});

// interface SearchFunc{
//     (source:string,subString:string):boolean;
// }
// let mySearch:SearchFunc;
// mySearch = function(src:string,sub:string){
//     let result = src.search(sub);
//     return result > -1;
// }

// interface StringArray{
//     [index:number]:string;
// }
// let myArray:StringArray;
// myArray = ["Bob","Fred"];
// let myStr:string = myArray[0];
// console.log(myStr);

// interface StringArray{
//     [index:number]:string;
// }
// let myArray:StringArray = ["Bob","fred"];
// let myStr:string = myArray[0];
// console.log(myStr);

// class Animal{
//     name:string;
// }
// class Dog extends Animal{
//     breed:string;
// }
// interface NotOkay{
//     [x:number]:Dog;
//     [x:string]:Animal;
// }

// interface NumberDictionary{
//     readonly [index:string]:string;
//     length:string;
//     name:string;
// }
// let my:NumberDictionary = {
//     "xiao1":'1',
//     "xiao2":'2',
//     length:'4',
//     name:"hru"
// };
// my.xiao1 = '3';

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
//     new (hour:number,minute:number);
// }
// class Clock implements ClockConstructor{
//     currentTime:Date;
//     constructor(h:number,m:number){}
// }

// interface ClockConstructor{
//     new (hour:number,minute:number):ClockInterface;
// }
// interface ClockInterface{
//     tick();
// }
// function createClock(ctor:ClockConstructor,hour:number,minute:number):ClockInterface{
//     return new ctor(hour,minute);
// }
// class DigitalClock implements ClockInterface{
//     constructor(h:number,m:number){}
//     tick(){
//         console.log("beep beep");
//     }
// }
// class AnalogClock implements ClockInterface{
//     constructor(h:number,m:number){}
//     tick(){
//         console.log("tick tick");
//     }
// }
// let digital = createClock(DigitalClock,12,17);
// let analog = createClock(AnalogClock,7,32);
// console.log(digital);
// console.log(analog);
// digital.tick();
// analog.tick();

// interface Shape{
//     color:string;
// }
// interface Square extends Shape {
//     sideLength:number;
// }
// let square = {} as Square;
// let square2 = <Square>{};
// square.color = "blue";
// square.sideLength = 10;

// interface Shape{
//     color:string;
// }
// interface PenStroke{
//     penWidth:number;
// }
// interface Square extends Shape,PenStroke{
//     sideLength:number;
// }
// let square = <Square>{};
// square.color = "blue";
// square.sideLength = 10;
// square.penWidth = 5.0;

// interface Counter{
//     (start:number):string;
//     interval:number;
//     reset():void;
// }
// function getCounter():Counter{
//     let counter = <Counter>function(start:number){};
//     counter.interval = 123;
//     counter.reset = function(){};
//     console.log(counter.interval);
//     return counter;
// }
// let c = getCounter();
// console.log(c);
// c(10);
// c.reset();
// c.interval = 5.0

// class Control{
//     private state:any;
// }
// interface SelectableControl extends Control{
//     select():void;
// }
// class Button extends Control implements SelectableControl{
//     select(){}
// }
// class TextBox extends Control{
//     select(){}
// }
// class Image implements SelectableControl{
//     select(){}
// }


