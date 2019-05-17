let list:number[] = [1,2,3];
console.log(list);
console.log('****************************');

let list2:Array<number> = [1,2,3];
console.log(list2);
console.log('*******************************');

let x:[string,number];
x = ['hello',10];
console.log(x);
console.log(x[0].substr(1));
x[3] = "world";
console.log(x);
console.log('*******************************');

enum Color{Red=2,Green=4,Blue=6}
let c:Color = Color.Blue;
console.log(c);
let colorName:string = Color[2];
console.log(colorName);





