var i = 0;
function mainFunc(){
	i++;
	postMessage(i);
}
var id = setInterval(mainFunc,1000);