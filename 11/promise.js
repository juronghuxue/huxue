// promise.then(function(value){},function(error){});
// function timeout(ms){
// 	return new Promise((resolve,reject)=>{
// 		setTimeout(resolve,ms,'done');
// 	})
// }
// timeout(3000).then((value)=>{
// 	console.log(111);
// 	console.log(value);
// },function(value){
// 	console.log(222);
// 	console.log(value);
// });

// let promise = new Promise(function(resolve,reject){
// 	console.log('Promise');
// 	resolve();
// });
// promise.then(function(){
// 	console.log('resolved.');
// });
// console.log('Hi');

// const getJSON = function(url){
// 	const promise = new Promise(function(resolve, reject){
// 		const handler = function(){
// 			if(this.readyState !== 4){
// 				return;
// 			}
// 			if(this.status === 200){
// 				resolve(this.response);
// 			}else{
// 				reject(new Error(this.statusText))
// 			}
// 		};
// 		const client = new XMLHttpRequest();
// 		client.open('GET',url);
// 		client.onreadystatechange = handler;
// 		client.responseType = 'json';
// 		client.setRequestHeader('Accept','application/json');
// 		client.send();
// 	});
// 	return promise
// }
// getJSON("/posts.json").then(function(json){
// 	console.log('Contents:'+json);
// },function(error){
// 	console.log('出错了',error);
// })


// const p1 = new Promise(function(resolve,reject){
// 	setTimeout(()=>reject('fail'),3000)
// });
// const p2 = new Promise(function(resolve,reject){
// 	setTimeout(()=>resolve(p1),1000)
// });
// p2.then(result=>console.log(result))
// .catch(error=>console.log(error))


// new Promise((resolve, reject) => {
// 	return resolve(1);
// 	console.log(2);
// }).then(r => {
// 	console.log(r);
// })


// const someAsyncThing = function(x){
// 	return new Promise(function(resolve, reject){
// 		resolve(x+2);
// 	})
// }

// someAsyncThing(1).then(function(){
// 	console.log('everying is great');
// })
// setTimeout(() => {
// 	console.log(123);
// },2000)


// const promise = new Promise(function(resolve,reject){
// 	return resolve('ok');
// 	setTimeout(function(){throw new Error('test')},0)
// });
// promise.then(function(value){console.log(value)});





// const someAsyncThing = function(){
// 	return new Promise(function(resolve, reject){
// 		resolve(x+2);
// 	});
// };
// someAsyncThing()
// .catch(function(error){
// 	console.log('oh,no',error);
// })
// .then(function(){
// 	console.log('carry on');
// })


// server.listen(port)
// .then(function(){

// })
// .finally(server.stop)


// const p = Promise.all([p1,p2,p3]);


// const promises = [2,3,4,5,7,11,13].map(function(id){
// 	return getJSON('/post/');
// });
// Promise.all(promises).then(function(posts){

// }).catch(function(reason){

// })


// const p = Promise.race([p1,p2,p3]);

















































