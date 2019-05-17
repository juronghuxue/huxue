// let isDone:boolean = false;
// console.log(isDone);

// let myName:string = 'huxu';
// let myAge:number = 25;
// let sentence:string = `Hello,my name is ${myName}.
// 		I be ${myAge +1 }years old next month.`;
// 		console.log(sentence);

// function alertName(): void {
// 	// console.log('My name is Tom');
// 	return '11111';
// }
// console.log(alertName());

// let u:undefined = undefined;
// let n:null = null;
// console.log(u,n);

// let num:number = undefined;
// console.log(num);

// let u:undefined;
// let num:number = u;
// console.log(u,num);

// let u:void;
// let num:number = u;
// console.log(u,num);

// let myFavoriteNumber: string = 'seven';
// myFavoriteNumber = 7;

// let myFavoriteNumber: any = 'seven';
// myFavoriteNumber = 7;
// console.log(myFavoriteNumber);

// let anyThing: any = 'hello';
// console.log(anyThing.myName);
// console.log(anyThing.myName.firstName);

// let anyThing: any = 'Tom';
// anyThing.setName('Jerry');
// anyThing.setName('Jerry').sayHello();
// anyThing.myName.setFirstName('Cat');

// let something; //let something:any
// something = 'seven';
// something = 7;
// something.setName('Tom');

// let myFavoriteNumber:string|number;
// myFavoriteNumber = 'seven';
// myFavoriteNumber = 7;

// let myFavoriteNumber:string|number|boolean;
// myFavoriteNumber = true;

// function getLength(something:number|string):number{
// 	return something.length;
// }

// function getString(something:string|number): string{
// 	return something.toString();
// }
// console.log(getString(1213));
// console.log(getString('hhvfiusd'));

// interface Person{
// 	name:string;
// 	age:number;
// }
// let tom:Person = {
// 	name:'Tom',
// 	age:25
// }
// console.log(tom);

// interface Person{
// 	name:string;
// 	age?:number;
// }
// let tom:Person = {
// 	name:'Tom'
// };
// console.log(tom);

// interface Person{
// 	name:string;
// 	age?:number;
// 	[propName:string]:any;
// }
// let tom:Person = {
// 	name:'Tom',
// 	age:25,
// 	gender:'male',
// 	a:'hdudish'
// }
// console.log(tom);

// interface Person{
// 	readonly id:number;
// 	name:string;
// 	age?:number;
// 	[propName:string]:any;
// }
// let tom:Person = {
// 	id:89757,
// 	name:'Tom',
// 	gender:'male'
// };
//  // tom.id = 76584
// console.log(tom.id);

// interface Person{
// 	readonly id:number;
// 	name:string;
// 	age?:number;
// 	[propName:string]:any;
// }
// let tom:Person = {
// 	name:'Tom',
// 	gender:'male'
// }
// tom.id = 6756;

// let fibonacci:number[] = [1,1,2,3,5];
// console.log(fibonacci);

// let fibonacci:number[] = [1,'1',3,4,5,6];
// console.log(fibonacci);

// let fibonacci:number[] = [1,1,2,3,5];
// fibonacci.push(8);
// console.log(fibonacci);

// let fibonacci:Array<number|string> = [1,'1',2,3,4,54];
// console.log(fibonacci);

// interface NumberArray{
// 	[index:number]:number;
// }
// let fibonacci:NumberArray = [1,2,54,456];
// console.log(fibonacci);

// let list:any[] = ['sdgcuyds',25,{website:'http://www.baidu.com'}];
// console.log(list);

// function sum(){
// 	let args:IArguments = arguments;
// }

// function sum(x:number,y:number): number{
// 	return x+y;
// }
// console.log(sum(3,4,5));

// let mySum = function(x:number,y:number): number{
// 	return x+y;
// }
// console.log(mySum(1,3));

// let mySum:(x:number,y:number) => number = function(x:number,y:number):number{
// 	return x+y;
// }
// console.log(mySum(3,6));

// interface SearchFunc{
// 	(source:string,substring:string):boolean;
// }
// let mySearch:SearchFunc;
// mySearch  =  function(source:string,subString:string){
// 	return source.search(subString) !== -1;
// }
// console.log(mySearch('grfesuhgvuihsr','fesuh'));

// function buildName(firstName:string,lastName?:string): string{
// 	if(lastName){
// 		return firstName+' '+ lastName;
// 	}else{
// 		return firstName;
// 	}
// }
// let tomcat = buildName('Tom','Cat');
// let tom = buildName('Tom');
// console.log(tom);

// function buildName(firstName:string,lastName:string='Cat'){
// 	return firstName+' '+lastName;
// }
// let tom = buildName('Tom','Cat');
// console.log(tom);

// function buildName(firstName:string='huxu',lastName:string){
// 	return firstName+' '+lastName;
// }
// let tomcat = buildName('hvjhd','Cat');
// console.log(tomcat);

// function push(array,...items){
// 	items.forEach(function(item){
// 		array.push(item);
// 	});
// }
// let a:number[] = [];
// console.log(a);
// push(a,1,2,3);
// console.log(a);

// function push(array:any[],...items:any[]){
// 	items.forEach(function(item){
// 		array.push(item);
// 	});
// }
// let a = [];
// push(a,1,2,3,true,'hfgvu',{value:'huxu'});
// console.log(a);

// function reverse(x:number):number;
// function reverse(x:string):string;
// function reverse(x:number|string):number|string{
// 	if(typeof x === 'number'){
// 		return Number(x.toString().split('').reverse().join())
// 	}else if(typeof x === 'string'){
// 		return x.split('').reverse().join('');
// 	}
// }

// function getLength(something:string|number):number{
// 	if((<string>something).length){
// 		return (<string>something).length;
// 	}else{
// 		return something.toString().length;
// 	}
// }
// console.log(getLength(23432));

// declare  var jQuery:(selector:string)=> any;
// jQuery('#foo');

// type Name = string;
// type NameResolver = () => string;
// type NameOrResolver = Name | NameResolver;
// function getName(n:NameOrResolver): Name{
// 	if(typeof n === 'string'){
// 		return n;
// 	}else{
// 		return n();
// 	}
// }

// type EventNames = 'click'|'scroll'|'mousemove';
// function handleEvent(ele:Element,event:EventNames){

// }
// handleEvent(document.getElementById('hello'),'scroll');
// handleEvent(document.getElementById('world'),'click'));

// let xcatliu:[string,number] = ['Xcat liu',25];

// enum Days{Sun,Mon,Tue,Wed,Thu,Fri,Sat};
// console.log(Days['Sun']);
// console.log(Days['Mon'] === 7);

// enum Days {Sun = 3, Mon = 2, Tue, Wed, Thu, Fri, Sat};
// console.log(Days['Wed']);

// enum Days {Sun=7,Mon,Tue,Wed,Thu,Fri,Sat=<any>'S'};
// console.log(Days['Sat']);

// enum Color {Red,Green,Blue="blue".length};

// const enum Directions{
// 	Up,
// 	Down,
// 	Left,
// 	Right
// }
// let directions = [Directions.Up,Directions.Down,Directions.Left,Directions.Right];
// console.log(directions);

// class Animal {
// 	constructor(name){
// 		this.name = name;
// 	}
// 	get name(){
// 		return 'Jack';
// 	}
// 	set name(value){
// 		console.log('setter:'+value);
// 	}
// }
// let a = new Animal('kitty');
// a.name = 'Tom';
// console.log(a.name);

// class Animal{
// 	static isAnimal(a){
// 		return a instanceof Animal;
// 	}
// }
// let a = new Animal('dfs');
// console.log(Animal.isAnimal(a));

// class Animal{
// 	name = 'Jack';
// 	constructor(){

// 	}
// }
// let a = new Animal();
// console.log(a.name);

// class Animal{
// 	static num = 42;
// 	constructor(){

// 	}
// }
// console.log(Animal.num);

// class Animal{
// 	public name;
// 	public constructor(name){
// 		this.name = name;
// 	}
// }
// let a = new Animal('Jack');
// console.log(a.name);
// a.name = 'Tom';
// console.log(a.name);

// class Animal{
// 	private name;
// 	public contructor(name){
// 		this.name = name;
// 	}
// }
// let a = new Animal('Jack');
// console.log(a.name);
// a.name = 'Tom';
// console.log(a.name);

// abstract class Animal{
// 	public name;
// 	public constructor(name){
// 		this.name = name;
// 	}
// 	public abstract sayHi();
// }
// class Cat extends Animal{
// 	public sayHi(){
// 		console.log(`Meow,My name is ${this.name}`);
// 	}
// }
// let a = new Cat('Tom');
// console.log(a.sayHi());

// class Animal{
// 	name:string;
// 	constructor(name:string){
// 		this.name = name;
// 	}
// 	sayHi():string{
// 		return `My name is ${this.name}`;
// 	}
// }
// let a:Animal = new Animal('Jack');
// console.log(a.sayHi());

// class Animal {
// 	name:string
// 	constructor(name:string){
// 		this.name = name;
// 	}
// 	sayHi():string {
// 		return `My name is ${this.name}`;
// 	}
// }
// let a = new Animal('cat');
// console.log(a.sayHi());

// interface Alarm{
// 	alert();
// }
// class Door{

// }
// class SecurityDoor extends Door implements Alarm{
// 	alert(){
// 		console.log('SecurityDoor alert');
// 	}
// }
// class Car implements Alarm{
// 	console.log('Car alert');
// }

// interface Alarm{
// 	alert();
// }
// interface LightableAlarm extends Alarm {
// 	lightOn();
// 	lightOff();
// }

// class Point{
// 	x:number;
// 	y:number;
// }
// interface Point3d extends Point{
// 	z:number;
// }
// let pointed3d:Point3d = {x:1,y:2,z:3};
// console.log(pointed3d);

// interface SearchFunc {
// 	(source:string,substring:string):boolean;
// }
// let mySearch:SearchFunc;
// mySearch = function(source:string,substring:string): boolean{
// 	return source.search(substring) !== -1;
// }
// console.log(mySearch('huxuhdfheig','hury'));

// interface Counter{
// 	(start:number):string;
// 	interval:number;
// 	reset():void;
// }
// function getCounter():Counter{
// 	let counter = <Counter>function (start: number){
// 		console.log('Counter');
// 	};
// 	counter.interval = 123;
// 	counter.reset = function(){
// 		console.log('reset');
// 	};
// 	return counter;
// }
// let c = getCounter();
// c(10);
// c.reset();
// c.interval = 5.0;
// console.log(c.interval);

// function createArray(length:number,value:any): Array<any>{
// 	let result = [];
// 	for(let i = 0;i<length;i++){
// 		result[i] = value;
// 	}
// 	return result;
// }
// createArray(3,'x');

// function createArray<T>(length:number,value:T): Array<T>{
// 	let result:T[] = [];
// 	for(let i = 0;i<length;i++){
// 		result[i] = value;
// 	}
// 	return result;
// }
// console.log(createArray<string>(3,'x'));

// function swap<T,U>(tuple:[T,U]):[U,T]{
// 	return [tuple[1],tuple[0]];
// }
// console.log(swap([7,'seven']));

// interface Lengthwise{
// 	length:number;
// }
// function loggingIdentity<T extends Lengthwise>(arg:T):T{
// 	console.log(arg.length);
// 	return arg;
// }
// console.log(loggingIdentity('hisfuh'));

// class G<T>{
// 	zeroValue:T;
// 	add:(x:T,y:T) => T;
// }
// let myG = new G<number>();
// myG.zeroValue = 5;
// myG.add = function(x,y){return x+y;};
// console.log(myG.zeroValue);
// console.log(myG.add(3,4));

// function createArray<T=string>(length:number,value:T): Array<T>{
// 	let result:T[] = [];
// 	for(let i = 0;i<length;i++){
// 		result[i] = value;
// 	}
// 	return result;
// }
















































