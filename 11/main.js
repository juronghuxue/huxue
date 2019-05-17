var fs = require('fs');
var data = fs.readFileSync('input.txt');
console.log(data.toString());
console.log("程序运行结束");

// var fs = require('fs');
// fs.readFile('input.txt',function(err,data){
// 	if(err){
// 		return console.err(error);
// 	}
// 	console.log(data.toString());
// });
// console.log("程序运行结束");