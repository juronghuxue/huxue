var http = require('http');
http.createServer(function(request,response){
	response.writeHead(200,{'Content-Typre':'text/plain'});
	response.end('Hello world!');
}).listen(8888);
console.log('Server running bat http://127.0.0.1:8888');