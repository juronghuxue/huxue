interface StringArray{
	[index:number]:string;
}
let myArray:StringArray;
myArray = ["Bob","Fred"];
let myStr:string = myArray[1];
console.log(myStr);
console.log('**********************');

interface Counter{
	(start:number):string;
	interval:number;
	reset:void;
}
function getCounter():Counter{
	let counter = <Counter>function(start:number){};
	counter.interval = 123;
	counter.reset = function(){};
	return counter;
}
let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;


