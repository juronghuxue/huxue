var buffer1 = Buffer.from('ABCDE');
var buffer2 = Buffer.from('ABCD');
var result = buffer1.compare(buffer2);
if(result<0){
	console.log(buffer1+'在'+buffer2+'之前');
}else if(result==0){
	console.log(buffer1+'与'+buffer2+'相同');
}else{
	console.log(buffer1+'在'+buffer2+'之后');
}



var buf1 = Buffer.from('asdjkljflskjfl');
var buf2 = Buffer.from('RUNOOB');
buf2.copy(buf1,2);
console.log(buf1.toString());