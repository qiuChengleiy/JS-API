
具体配置 和 代码 参考 目录typescript 一下是学习过程中做的笔记： 

// 1.test

// function greeter(person: string) {
//     return "Hello, " + person;
// }

// let user = "Jane User";

// console.log(greeter(user));



//2. 接口

// interface Person {
//     firstName: string;
//     lastName: string;
// }

// function greeter(person: Person) {
//     return "Hello, " + person.firstName + " " + person.lastName;
// }

// let user = { firstName: "Jane", lastName: "User" };

// document.body.innerHTML = greeter(user);


//3. 类
class Student {
     fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

console.log(greeter(user));



//4. 正式学习

/***
*  1. 数据类型
    语法：   var:类型  
    类型： boolean string number array tuple(元组) enum any void  never
   2.断言 （var as 数据类型）

*/

let a:boolean = true;

let b:number = 1;

let c:string = '123';

let str:string = `string is ${c}`;  //支持es6模版字符串的写法 可以嵌套


let d:number[] = [1,2,3];
let e: Array<number> =  [1,2,3];   //定义类型为number的数组

//元组 允许你定义直对应的类型
let Tuple : [string,number] ;
Tuple = ['hello',123];


//枚举
enum Color {Red = 2, Green, Blue}  //手动编号
let colorName: string = Color[2];

//alert(colorName);  // 显示'Green'因为上面代码里它的值是2



//Any

let anyArr :Array<any> = [1,2,'3',4,true,5];



//void  某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void：

function Voids(): void {
	//return 1;   //  if return  will  err
} 

let voids_:void = null;  //  | undefined


// null 和undefined
let u: undefined = undefined;
let n: null = null;


//never类型表示的是那些永不存在的值的类型。 
//例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型；
// 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。
 
//never类型是任何类型的子类型，也可以赋值给任何类型；
//然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。

//never类型

function error( message:string): never {
	throw new Error(message);
}


function fail() {
	return error('failed ~');
}

function infiniteLoop(): never {
    while (true) {
    }
}



//断言

let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;



let value1:string = 'hello 1';

let value2:number = (value1 as string).length ;

//两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；然而，当你在TypeScript里使用JSX时，只有 as语法断言是被允许的。












/**
*   接口
*	
*/

//TypeScript的核心原则之一是对值所具有的结构进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。 
//在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。

function interface1(obj: {a:number,b:string}) {
	console.log(obj.a+obj.b);
}

interface1({a:1,b:'hello'});


// 定义接口写法
interface ObjValue {
	a:number;
	b:string;
}

function interface2(obj:ObjValue ) {
	console.log(obj.a+obj.b);
}

interface2({a:1,b:'hello'});


//接口的可选属性
interface AttributeConfig {
	width?: number;
	color?: string; 
	opacity?: number;
	[propName: string] : any;  //额外的属性选项
}


//定义了 三个可选属性 并且要求函数有返回值

function interface3(obj:AttributeConfig): { width?: number; opacity?: number;} {
	let attribute = { width:100,color:'red' };
	if( obj.width ) {
		obj.width = attribute.width;
		console.log(obj.dex);
	}
	return obj;
}

//interface3({width:200,color:'red'});

//如果传入额外的属性  ts会对其进行检查  而我们并不期望这样 绕开检查只需要进行 断言即可
//interface3({dex:'yes'} as AttributeConfig);

//将对象赋值给其他变量 也可以绕过检查
let objs = {dex:'yes'};
interface3(objs);




//只读属性
interface Points  {     
	readonly x: number;
	readonly y: string;
}

let point: Points = { x:100,y:'hello' };
//point.x = 200;   // 只读属性无法修改的 否则报错

//数组只读属性写法
let arrWrite: number[] = [1,2,3,4,5];
let arrRead: ReadonlyArray<number> = arrWrite;
//arrRead[0] = 00;

//arrRead[0] = 12; // error!
//arrRead.push(5); // error!
//arrRead.length = 100; // error!

//可以断言重写
let arrWrites:number[] = [];
arrWrites = arrRead as number[];
arrWrites[0] = 999; // [999, 2, 3, 4, 5]



//函数类型的定义

interface Func {
	(source: string ,substring: string ): boolean; //为了使用接口表示函数类型，我们需要给接口定义一个调用签名
}

//函数的参数名不需要与接口里定义的名字相匹配

let fnStr : Func ;
fnStr = function(src: string, sub: string): boolean {
	 let result = src.search(sub);
  	 return result > -1;
}  




//索引类型
interface StringArray {       //共有支持两种索引签名：字符串和数字
	[index: number] :string;  //规定了索引为number 返回值类型为string 
}

let myArray : StringArray;
myArray = ['hello','world'] ;

let myStr = myArray[0];   


interface ReadonlyStringArray {
    readonly [index: number]: string;   //也可以将索引签名 设置为只读
}
let myArrays: ReadonlyStringArray = ["Alice", "Bob"];
//myArrays[2] = "Mallory"; // error!




//类类型

interface Classprop {
	current : Date ;
	setTime(d: Date);
}


class Clock implements Classprop {
	current :Date;
	setTime(d: Date) {
		this.current = d;
	}

    constructor(h: number, m: number) { }
}



//继承接口


interface in_1 {
	a: number;
}


interface in_2 extends in_1 {
	b: string ;
}

let inFace = <in_2>{};
inFace.a = 111;
inFace.b = '222';

//多接口继承
interface in_3 extends in_1,in_2 {
	c: string;
}

let inFaces = <in_3>{};
inFaces.a = 111;
inFaces.b = '22';





// 混合类型
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let g = getCounter();
g(10);
g.reset();
g.interval = 5.0;


