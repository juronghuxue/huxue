// function* helloWorldGenerator(){
// 	yield 'hello';
// 	yield 'world'; 
// 	return 'ending';
// }
// var hw = helloWorldGenerator();
// console.log(hw.next());
// console.log(hw.next());
// console.log(hw.next());
// console.log(hw.next());



// function* f(){
// 	console.log('执行了');
// }
// var generator = f();

// setTimeout(function(){
// 	generator.next();
// },2000);


// var arr = [1,[[2,3,[78,88]],4],[5,6]];
// var flat = function* (a){
// 	var length = a.length;
// 	for(var i = 0;i<length;i++){
// 		var item = a[i];
// 		if(typeof item !== 'number'){
// 			yield* flat(item);
// 		}else{
// 			yield item;
// 		}
// 	}
// }

// for(var f of flat(arr)){
// 	console.log(f);
// }

// var myIterable = {};
// myIterable[Symbol.iterator] = function* (){
// 	yield 1;
// 	yield 2;
// 	yield 3;
// }
// console.log([...myIterable]);


// function* gen(){

// }
// var g = gen();
// console.log(g[Symbol.iterator]() === g)


// function* f(){
// 	for(var i = 0;true;i++){
// 		var reset = yield i;
// 		console.log(reset);
// 		if(reset){
// 			i = -1;
// 		}
// 	}
// }
// var g = f();
// console.log(g.next());
// console.log(g.next());
// console.log(g.next(true));

// function* foo(x){
// 	console.log(x);
// 	var y = 2* (yield (x+1));  //12
// 	console.log(y);
// 	var z = yield (y/3);       //4
// 	console.log(z);
// 	return (x+y+z);
// }
// var a = foo(5);
// console.log(a.next());
// console.log(a.next());
// console.log(a.next());
// var b = foo(5);
// console.log(b.next());
// console.log(b.next(12));
// console.log(b.next(13));

// function* dataConsumer(){
// 	console.log(`started`);
// 	console.log(`1.${yield}`);
// 	console.log(`2.${yield}`);
// 	return `result`;
// }
// let genObj = dataConsumer();
// genObj.next();
// genObj.next('a');
// genObj.next('b');


// function* foo(){
// 	yield 1;
// 	yield 2;
// 	yield 3;
// 	yield 4;
// 	yield 5;
// 	return 6;
// }
// for(let v of foo()){
// 	console.log(v);
// }


// function* fibonacci(){
// 	let [prev,curr] = [0,1];
// 	for(;;){
// 		yield curr;
// 		[prev,curr] = [curr,prev+curr];
// 	}
// }
// for(let n of fibonacci()){
// 	if(n>1000) break;
// 	console.log(n);
// }

// function* objectEntries(obj){
// 	let propKeys = Reflect.ownKeys(obj);
// 	console.log(propKeys);
// 	for(let propKey of propKeys){
// 		yield [propKey,obj[propKey]];
// 	}
// }

// let jane = {first:'Jane',last:'Doe'};
// for(let [key,value] of objectEntries(jane)){
// 	console.log(`${key}: ${value}`);
// }


// function* numbers(){
// 	yield 1;
// 	yield 2;
// 	return 3;
// 	yield 4;
// }
// console.log([...numbers()]);
// console.log(Array.from(numbers()));
// let [x,y] = numbers();
// console.log([x,y]);
// for(let n of numbers()){
// 	console.log(n);
// }
// var g = function* (){
// 	try{
// 		yield;
// 	} catch(e){
// 		console.log('内部捕获',e);
// 	}
// };
// var i = g();
// i.next();
// try{
// 	i.throw('a');
// 	i.throw('b');
// }catch(e){
// 	console.log('外部捕获',e);
// }

// function* gen(){
// 	yield 1;
// 	yield 2;
// 	yield 3;
// }
// var g = gen();
// console.log(g.next());
// console.log(g.return('foo'));
// console.log(g.next());

// function* foo(){
// 	yield 'a';
// 	yield 'b';
// }

// function* bar(){
// 	yield 'x';
// 	foo();
// 	yield 'y';
// }
// for(let v of bar()){
// 	console.log(v);
// }


// function* foo(){
// 	yield 'a';
// 	yield 'b';
// }
// function* bar(){
// 	yield 'x';
// 	yield* foo();
// 	yield 'y';
// }
// for(let v of bar()){
// 	console.log(v);
// }

// function* concat(iter1,iter2){
// 	yield* iter1;
// 	yield* iter2;
// }
// function* concat(iter1,iter2){
// 	for(var value of iter1){
// 		yield value;
// 	}
// 	for(var value of iter2){
// 		yield value;
// 	}
// }
// var gen = concat(["a","b","c"],["d","e","f"]);
// for(let value of gen){
// 	console.log(value);
// }

// let read = (function* (){
// 	yield 'hello';
// 	yield* 'hello';
// })();
// console.log(read.next().value);
// console.log(read.next().value);
// console.log(read.next().value);

// function* foo(){
// 	yield 2;
// 	yield 3;
// 	return "foo";
// }
// function* bar(){
// 	yield 1;
// 	var v = yield* foo();
// 	console.log("v:"+v);
// 	yield 4;
// }
// var it = bar();
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log([...it]);

// const tree = ['a',['b','c'],['d','e',["f","g","h",["i","j"]]]];
// function* iterTree(tree){
// 	if(Array.isArray(tree)){
// 		for(let i = 0;i<tree.length;i++){
// 			yield* iterTree(tree[i]);
// 		}
// 	}else{
// 		yield tree;
// 	}
// }
// for(let x of iterTree(tree)){
// 	console.log(x);
// }

// let obj = {
// 	*myGeneratorMethod(){
// 		...
// 	}
// };
// let obj = {
// 	myGeneratorMethod:function* (){

// 	}
// }

// function* g(){
// 	this.a = 11;
// }
// let obj = g();
// obj.next();
// console.log(obj.a)

// function* F(){
// 	this.a = 1;
// 	yield this.b = 2;
// 	yield this.c = 3;
// }
// var obj = {};
// var f = F.call(obj);
// console.log(f.next());
// console.log(f.next());
// console.log(f.next());
// console.log(obj.a);
// console.log(obj.b);
// console.log(obj.c);

// var clock = function* (){
// 	while(true){
// 		console.log('Tick！');
// 		yield;
// 		console.log('Tock!');
// 		yield;
// 	}
// }
// console.log(clock().next());
// console.log(clock().next());
// console.log(clock().next(false));
// console.log(clock().next());

// function* numbers(){
// 	let file = new FileReader("input.txt");
// 	try{
// 		while(!file.eof){
// 			yield parseInt(file.readLine(),10);
// 		}
// 	}finally{
// 		file.close();
// 	}
// }
// console.log(numbers().next());
// console.log(numbers().next());


// let steps = [stop1Func,step2Func,step3Func];
// function* iterateSteps(steps){
// 	for(var i = 0;i<steps.length;i++){
// 		var step = steps[i];
// 		yield step();
// 	}
// }


// function* iterEntries(obj){
// 	let keys = Object.keys(obj);
// 	for(let i = 0;i<keys.length;i++){
// 		let key = keys[i];
// 		yield [key,obj[key]];
// 	}
// }
// let myObj = {foo:3,bar:7};
// for(let [key,value] of iterEntries(myObj)){
// 	console.log(key, value);
// }


//只能在nodejs环境运行
// var readFile = require('fs-readfile-promise');
// readFile('input.txt').then(function(data){
// 	console.log(data.toString());
// })
// .then(function(data){
// 	return readFile('input.txt');
// })
// .then(function(data){
// 	console.log(data.toString());
// })
// .catch(function(err){
// 	console.log(err);
// })


// function* asyncJob(){
// 	var f = yield readFile('input.txt');
// }

// function* gen(x){
// 	var y = yield x +2;
// 	return y;
// }
// var g = gen(1);
// console.log(g.next());
// console.log(g.next(23));



// var fetch = require('node-fetch');
// function* gen(){
// 	var url = 'https://api.github.com/users/github';
// 	var result = yield fetch(url);
// 	console.log(result.bio);
// }
// var g = gen();
// var result = g.next();
// result.value.then(function(data){
// 	return data.json();
// }).then(function(data){
// 	g.next(data);
// });

// var fs = require('fs');
// var thunkify = require('thunkify');
// var readFileThunk = thunkify(fs.readFile);
// var gen = function* (){
// 	var r1 = yield readFileThunk('input.txt');
// 	console.log(r1.toString());
// 	var r2 = yield readFileThunk('index.html');
// 	console.log(r2.toString());
// }
// var g = gen();
// var r1 = g.next();
// r1.value(function(err,data){
// 	if(err) throw err;
// 	var r2 = g.next(data);
// 	r2.value(function(err,data){
// 		if(err) throw err;
// 		g.next(data);
// 	});
// });


// var fs = require('fs');
// var gen = function* (){
// 	var f1 = yield readFile('index.html');
// 	var f2 = yield readFile('input.txt');
// 	console.log(f1.toString());
// 	console.log(f2.toString());
// }
// var co = require('co');
// co(gen);
// co(gen).then(function(){
// 	console.log('Generator函数执行完成');
// })


const co = require('co');
const fs = require('fs');

const stream = fs.createReadStream('Stream.js');
let valjeanCount = 0;

co(function*() {
  while(true) {
    const res = yield Promise.race([
      new Promise(resolve => stream.once('data', resolve)),
      new Promise(resolve => stream.once('end', resolve)),
      new Promise((resolve, reject) => stream.once('error', reject))
    ]);
    if (!res) {
      break;
    }
    stream.removeAllListeners('data');
    stream.removeAllListeners('end');
    stream.removeAllListeners('error');
    valjeanCount += (res.toString().match(/valjean/ig) || []).length;
  }
  console.log('count:', valjeanCount); // count: 1120
});






















