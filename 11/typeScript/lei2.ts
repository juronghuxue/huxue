


console.log('************************');
let passcode = "secret passcode";
class Employee{
	private _fullName:string;

	get fullName():string{
		console.log('aaa  '+this._fullName);
		return this._fullName;
	}

	set fullName(newName:string){
		if(passcode && passcode == "secret passcode"){
			this._fullName = newName;
		}else {
			console.log("Error");
		}
	}
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log('bbb '+employee.fullName);
}



























