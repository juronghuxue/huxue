var fs = require('fs');
var data = 'dshfkjdhghdsfwww.runoob.com';

var writerStream = fs.createWriteStream('input.txt');

writerStream.write(data,'UTF8');

writerStream.end();

writerStream.on('finish',function(){
	console.log('写入完成');
});
writerStream.on('error',function(){
	console.log(error.stack);
});

console.log('程序执行完毕');