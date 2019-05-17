abstract class Department{
	constructor(public name:string){

	}
	printName():void{
		console.log('Department name: '+this.name);
	}

}
class AccountingDepartment extends Department{
	constructor(){
		super("Accounting and Auditing");
	}
	printMeeting():void{
		console.log("The Accounting Department meets each Monday at 10am.");
	}
	generateReports(): void {
        console.log('Generating accounting reports...');
    }
}
let department: Department;
department = new AccountingDepartment();

class Point{
	x:number;
	y:number;
}
interface Point3d extends Point{
	z:number;
}
let point3d:Point3d = {x:1,y:2,z:3};
console.log(point3d);





























