// let s = Symbol();
// console.log(typeof s);

// let s1 = Symbol('foo');
// let s2 = Symbol('bar');
// console.log(s1.toString());
// console.log(s2.toString());

// const obj = {
//     toString(){
//         return 'abc';
//     }
// };
// const sym = Symbol(obj);
// console.log(sym);

// let s1 = Symbol();
// let s2 = Symbol();
// console.log(s1 == s2);

// let s1 = Symbol('foo');
// let s2 = Symbol('foo');
// console.log(s1 === s2);

// let sym = Symbol('My symbol');
// console.log('your symbol is'+sym);

// let sym = Symbol('My school');
// console.log(String(sym)+'huxu');
// console.log(sym.toString()+"huxu");

// let sym = Symbol();
// console.log(Boolean(sym));
// console.log(!sym);
// if(sym){
//     console.log('huxu');
// }
// Number(sym);
// console.log(sym+2);

// const sym = Symbol('foo');
// console.log(sym.description) // "foo"

// let mySymbol = Symbol();
// let a = {};
// a['mySchool'] = "Hello!";
// console.log(a);

// let mySymbol = Symbol();
// let a = {
//     [mySchool]:'Hello!'
// };
// console.log(a);

// let a = {};
// Object.defineProperty(a,mySymbol,{value:'Hello!'});
// console.log(a);

// let s = Symbol();
// let obj = {
//     [s]:function(arg){
//         console.log(arg);
//     }
// };
// obj[s](123);

// let s = Symbol();
// let obj = {
//     [s](arg){
//         console.log(arg);
//     }
// };
// obj[s](123);

// const log = {};
// log.levels = {
//     DEBUG:Symbol('debug'),
//     INFO:Symbol('info'),
//     WARN:Symbol('warn')
// };
// console.log(log.levels.DEBUG.toString());
// console.log(log.levels.INFO.toString());

// const obj = {};
// let a = Symbol('a');
// let b = Symbol('b');
// obj[a] = 'Hello';
// obj[b] = 'World';
// const objectSymbols = Object.getOwnPropertySymbols(obj);
// console.log(objectSymbols);

// const obj = {};
// let foo = Symbol('foo');
// let a = Symbol('b');
// Object.defineProperty(obj,foo,{
//     value:"footer"
// });
// for(let i in obj){
//     console.log(i);
// }
// console.log(Object.getOwnPropertyNames(obj));
// console.log(Object.getOwnPropertySymbols(obj));
// console.log(obj);

// let obj ={
//     [Symbol('my_key')]:1,
//     enum:2,
//     nonEnum:3
// };
// console.log(Reflect.ownKeys(obj));

// let size = Symbol('size');
// class Collection{
//     constructor(){
//         this[size] = 0;
//     }
//     add(item){
//         this[this[size]] = item;
//         this[size]++;
//     }
//     static sizeOf(instance){
//         return instance[size];
//     }
// }
// let x = new Collection();
// Collection.sizeOf(x);
// x.add('foo');
// console.log(x);
// x = {
//     [size]:1,
//     0:'foo'
// }

// let s1 = Symbol.for('foo');
// let s2 = Symbol.for('foo');
// console.log(s1 === s2);

// console.log(Symbol.for('bar') === Symbol.for('bar'));
// console.log(Symbol('bar') === Symbol('bar'));

// let s1 = Symbol.for('foo');
// console.log(Symbol.keyFor(s1));
// let s2 = Symbol('foo');
// console.log(Symbol.keyFor(s2));

// let iframe = document.createElement('iframe');
// iframe.src = String(window.location);
// document.body.appendChild(iframe);
// console.log(iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo'));

// class MyClass{
//     [Symbol.hasInstance](foo){
//         return foo instanceof Array;
//     }
// }
// console.log([1,2,3] instanceof new MyClass());

// class Even{
//     static [Symbol.hasInstance](obj){
//         return Number(obj)%2 === 0;
//     }
// }

// var obj = new Proxy({},{
//     get:function(target,key,receiver){
//         console.log(target,key,receiver);
//         return Reflect.get(target,key,receiver);
//     },
//     set:function(target,key,value,receiver){
//         console.log(target,key,receiver);
//         return Reflect.set(target,key,value,receiver);
//     }
// });
// console.log(obj.count = 1);
// ++obj.count;

// var proxy = new Proxy({},{
//     get:function(target,property){
//         console.log(target);
//         return 45;
//     }
// });
// proxy.age = 35;
// proxy.title = 25;
// console.log(proxy.age);

// var t = {};
// var handler = {};
// var proxy = new Proxy(t,{
//     set:function(target){
//         return target.a = 'c';
//     },
//     get:function(target){
//         return target.a = 'd';
//     }
// });
// proxy.a = 'b';
// console.log(proxy.a);

// var proxy = new Proxy({},{
//     get:function(target,property){
//         return 35;
//     }
// });
// let obj = Object.create(proxy);
// console.log(obj.time);

// var person = {
//     name:'zhangsan'
// };
// var proxy = new Proxy(person,{
//     get:function(target,property){
//         if(property in target){
//             return target[property]
//         }else{
//             throw new ReferenceError("Property \"" + property + "\" does not exist.");
//         }
//     }
// });
// console.log(proxy.name);
// console.log(proxy.age);

// let t = [1,2,3];
// let arr = new Proxy(t,{
//     get(target,propKey,receiver){
//         let index = Number(propKey);
//         if(index<0){
//             propKey = String(target.length+index);
//         }
//         return Reflect.get(target,propKey,receiver);
//     }
// });
// console.log(arr[-1]);

// var handler = {
//     has(target,key){
//         if(key[0] === '_'){
//             return false;
//         }
//         return key in target;
//     }
// };
// var target = {_prop:'foo',prop:'foo2'};
// var proxy = new Proxy(target,handler);
// console.log('_prop' in proxy);
// console.log('prop2' in proxy);

// var handler = {
//     construct(target,args,newTarget){
//         return new target(...args);
//     }
// };

// var p = new Proxy(function(){},{
//     construct:function(target,args){
//         return {value:args[0]*10};
//     }
// });
// console.log((new p(1)).value);

// const promise = new Promise(function(resolve,reject){
//     if(){
//         resolve(value);
//     }else{
//         reject(error);
//     }
// });

// promise.then(function(value){

// },function(error){

// });

// function timeout(ms){
//     return new Promise((resolve,reject) => {
//         setTimeout(resolve,ms,'done');
//     })
// }
// timeout(100).then((value)=>{
//     console.log(value);
// })

// let promise = new Promise(function(resolve,reject){
//     console.log('promise');
//     resolve();
// });
// promise.then(function(){
//     console.log('resolved.');
// })
// console.log('Hi!');

// function *helloWorldG(){
//     yield 'hello';
//     yield 'world';
//     return 'ending';
// }
// var hw = helloWorldG();
// console.log(hw.next());
// console.log(hw.next());
// console.log(hw.next());
// console.log(hw.next());

// function* gen(){
//     yield 123+456;
// }
// let g = gen();
// console.log(g.next());
// console.log(g.next());

// function* f(){
//     console.log('执行了');
// }
// var generator = f();
// setTimeout(function(){
//     generator.next();
// },2000);

// let myIterable = {};
// myIterable[Symbol.iterator] = function* (){
//     yield 1;
//     yield 2;
//     yield 3;
// }
// console.log([...myIterable]);

// function* gen(){

// }
// let g = gen();
// console.log(g);
// console.log(g[Symbol.iterator]);
// console.log(g[Symbol.iterator]() === g);

// function* f(){
//     for(var i = 0;true;i++){
//         var reset = yield i;
//         if(reset){
//             i = -1;
//         }
//     }
// }
// var g = f();
// console.log(g.next());
// console.log(g.next());
// console.log(g.next(true));
// console.log(g.next());

// function* dataConsumer(){
//     console.log('Started');
//     console.log(`1.${yield}`);
//     console.log(`2.${yield}`);
//     return 'result'
// }
// let genObj = dataConsumer();
// genObj.next();
// genObj.next();
// genObj.next();

// function* foo() {
//     yield 1;
//     yield 2;
//     yield 3;
//     yield 4;
//     yield 5;
//     return 6;
//   }
//   for(let v of foo()){
//     console.log(v);
//   }

// function* objectEntries() {
//     console.log('0000'+this);
//     let propKeys = Object.keys(this);

//     for (let propKey of propKeys) {
//         yield [propKey, this[propKey]];
//     }
// }

// let jane = { first: 'Jane', last: 'Doe' };

// jane[Symbol.iterator] = objectEntries;

// for (let [key, value] of jane) {
//     // console.log(`${key}: ${value}`);
// }

// function* numbers(){
//     yield 1;
//     yield 2;
//     return 3;
//     yield 4;
// }
// console.log([...numbers()]);
// console.log(Array.from(numbers()));
// let [x,y] = numbers();
// console.log(x,y);
// for(let n of numbers()){
//     console.log(n);
// }

// function* foo(){
//     yield 'a';
//     yield 'b';
// }
// function* bar(){
//     yield 'x';
//     yield* foo();
//     yield 'y';
// }
// for(let v of bar()){
//     console.log(v);
// }

function* inner(){
    yield 'hello!';
}
// function* outer1(){
//     yield 'open';
//     yield inner();
//     yield 'close';
// }
// var gen = outer1();
// console.log(gen.next().value);
// console.log(gen.next().value);
// console.log(gen.next().value);
// function* outer2(){
//     yield 'open';
//     yield* inner();
//     yield 'close';
// }
// var gen = outer2();
// console.log(gen.next().value);
// console.log(gen.next().value);
// console.log(gen.next().value);

// function Point(x,y){
//     this.x = x;
//     this.y = y;
// }
// Point.prototype.toString = function(){
//     return '['+this.x+','+this.y+']';
// }
// var p = new Point(5,6);
// console.log(p.toString());

// class Point{
//     constructor(x,y){
//         this.x = x;
//         this.y = y;
//     }
//     toString(){
//         return '('+this.x+','+this.y+')';
//     }
// }
// var p2 = new Point(1,8);
// console.log(p2.toString());

// class Point{

// }
// console.log(typeof Point);
// console.log(Point === Point.prototype.constructor);

// class Bar{
//     doStuff(){
//         console.log('stuff');
//     }
// }
// var b = new Bar();
// b.doStuff();

// class Point{
//     constructor(){

//     }
//     toString(){

//     }
//     toValue(){

//     }
// }

// Point.prototype = {
//     constructor(){},
//     toString(){},
//     toValue(){}
// };
// Object.assign(Point.prototype,{
//     toString(){},
//     toValue(){}
// })

// class B{

// }
// let b = new B();
// console.log(b.constructor === B.prototype.constructor);

// class Point{
//     constructor(x,y){

//     }
//     toString(){

//     }
// }
// console.log(Object.keys(Point.prototype));
// console.log(Object.getOwnPropertyNames(Point.prototype));

// var Point = function(x,y){

// }
// Point.prototype.toString = function(){

// }
// console.log(Object.keys(Point.prototype));
// console.log(Object.getOwnPropertyNames(Point.prototype));

// class Point{

// }
// class Point{
//     constructor(){}
// }

// class Foo{
//     constructor(){
//         return Object.create(null);
//     }
// }
// console.log(new Foo() instanceof Foo);

// class Point{
//     constructor(x,y){
//         this.x = x;
//         this.y = y;
//         // this.toString = function toString(){
//         //     return '('+this.x+','+this.y+')';
//         // }
//     }
//     toString() {
//         return '(' + this.x + ', ' + this.y + ')';
//     }
    
// }
// var point = new Point(2,3);
// console.log(point.toString());
// console.log(point.hasOwnProperty('x'));
// console.log(point.hasOwnProperty('y'));
// console.log(point.hasOwnProperty('toString'));
// console.log(point.__proto__.hasOwnProperty('toString'));

// var p1 = new Point(2,3);
// var p2 = new Point(4,5);
// p1.__proto__.printName = function(){
//     return 'Oops';
// }
// console.log(p1.printName());
// console.log(p2.printName());
// var p3 = new Point(4,2);
// console.log(p3.printName());
// console.log(p1.__proto__ === p2.__proto__);

// null
// undefined 
// String
// Boolean
// Number
// Symbol
// Object

// let a = 111;
// console.log(a.toString());

// let a = {
//     name:'FE'
// };
// let array = Array.from(a);
// console.log(array);
// for(arr of a){
//     console.log(arr);
// }
// let b = a;
// b.name = 'EF';
// console.log(a.name);

// console.log(typeof 1);
// console.log(typeof '1');
// console.log(typeof undefined);
// console.log(typeof true);
// console.log(typeof Symbol());
// console.log(typeof b);

// console.log(typeof []);
// console.log(typeof {});
// console.log(typeof console.log);

// console.log(typeof null);

// let a;
// console.log(a === void 0);

// let a = {
//     valueOf(){
//         return 10
//     },
//     toString(){
//         return 8;
//     },
//     [Symbol.toPrimitive](){
//         return 12;
//     }
// }
// console.log(1+a);
// console.log('1'+a);

// console.log([1,2]+[2,1]);

// function Foo(){
//     return this;
// }
// Foo.getName = function(){
//     console.log('1');
// };
// Foo.prototype.getName = function(){
//     console.log('2');
// }
// console.log(new Foo.getName());
// console.log(new Foo().getName());

// function foo(){
//     console.log(this.a);
// }
// var a = 1;
// foo();
// var obj = {
//     a:15,
//     foo:foo
// };
// obj.foo();
// var c = new foo();
// c.a = 3;
// console.log(c.a);

// function a(){
//     return () => {
//         return () => {
//             console.log(this);
//         }
//     }
// }
// console.log(a()()());

// var a = 10;
// function foo(i){
//     var b = 20;
// }
// foo();
// console.log(globalContext.VO === globe);

// b();
// console.log(a)
// var a = 'Hello world';
// function b(){
//     console.log('call b');
// }

// b();
// function b(){
//     console.log('call b first');
// }
// function b(){
//     console.log('call b second');
// }
// var b = 'Hello world';

// var foo = 1;
// (function foo(){
//     foo = 10;
//     console.log(foo);
// }())

// function A(){
//     let a = 1;
//     function B(){
//         console.log(a);
//     }
//     return B;
// }
// console.log(A()());

// for(var i = 1;i<=5;i++){
//     (function (j){
//         setTimeout(function(){
//             console.log(j);
//         },i*1000)
//     })(i)
    
// }
// for(var i = 1;i<=5;i++){
//     setTimeout(function timer(j){
//         console.log(j);
//     },i*1000,i)
// }

// let a = {
//     age:1
// };
// let b = a;
// a.age = 2;
// console.log(b.age);

// let a = {
//     age:1
// };
// // let b = Object.assign({},a);
// let b = {...a};
// a.age = 2;
// console.log(b.age);

// let a = {
//     age:1,
//     jobs:{
//         first:'FE'
//     }
// }
// let b = {...a};
// a.jobs.first = 'sgdvdgyg';
// console.log(b.jobs.first);
// let b = JSON.parse(JSON.stringify(a));
// a.jobs.first = 'native';
// console.log(b.jobs.first);

// function Supper(){}
// Super.prototype.getNumber = function(){
//     return 1;
// }
// function Sub(){}
// let s = new Sub();
// Sub.prototype = Object.create(Super.prototype,{
//     constructor:{
//         value:Sub,
//         enumberable:false,
//         writable:true,
//         configurable:true
//     }
// });

// class MyDate extends date {
//     test(){
//         return this.getTime()
//     }
// }
// let myDate = new MyDate();
// myDate.test();

// let a = {
//     value:1
// }
// function getValue(name,age){
//     console.log(name);
//     console.log(age);
//     console.log(this.value);
// }
// getValue.call(a,'yck','24');
// getValue.apply(a,['yck','24']);

// let a = [1,2,3];
// let b = a.map((v) =>v+1);
// console.log(b);

// console.log([1,[2],3].flatMap((v) => v+1));

// var arr = [1,2,3,4];
// var sum = arr.reduce(function(prev,cur,index,arr){
//     console.log(prev,cur,index);
//     return prev+cur;
// });
// console.log(arr,sum);

// async function test(){
//     return "1";
// }
// console.log(test());

// function sleep(){
//     return new Promise(resolve => {
//         setTimeout(() => {
//             console.log('finish');
//             resolve('sleep');
//         },2000);
//     })
// }
// async function test(){
//     let value = await sleep();
//     console.log("object");
// }
// test();

// let p = new Proxy(target,handler);

// class MyClass {
//     constructor(){}
//     get propw(){
//         return 'getter';
//     }
//     set propw(value){
//         console.log('setter:'+value);
//     }
// }
// let inst = new MyClass();
// inst.propw = 123;  
// console.log(inst.propw);

// const MyClass = class Me{
//     getClassName(){
//         return Me.name;
//     }
// }
// let inst = new MyClass();
// console.log(inst.getClassName());
// console.log(Me.name);

// const MyClass = class {
//     //
// }

// let person = new class{
//     constructor(name){
//         this.name = name;
//     }
//     sayName(){
//         console.log(this.name);
//     }
// }('张三')
// // var p1 = person('张三');
// // p1.sayName();
// person.sayName();


// class Foo{}
// new Foo();

// {
//     let Foo = class{};
//     class Bar extends Foo{

//     }
// }

// class Point{}
// console.log(Point.name);

// class Foo{
//     constructor(...args){
//         this.args = args;
//     }
//     *[Symbol.iterator](){
//         for(let arg of this.args){
//             yield arg;
//         }
//     }
// }
// for(let x of new Foo('hello','world')){
//     console.log(x);
// }

// class Foo{
//     static classMethod(){
//         console.log('hello');
//     }
// }
// Foo.classMethod();
// var foo = new Foo();
// foo.classMethod();



















