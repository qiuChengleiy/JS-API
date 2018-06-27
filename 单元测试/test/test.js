//服务端

const chai = require('chai')
const expect = chai.expect
const getNum = require('../index')

describe('Test', function() {
  it('should return 20 when the value is 10', function() {
      expect(getNum(10)).to.equal(20)
  })

  it('should return 1 when the value is 0', function() {
    expect(getNum(0)).to.equal(0)
  })
})



//客户端

mocha.ui('bdd')

var expect = chai.expect
describe("Tests", function () {
  before(function () {
    createDiv('test')
  })
  it("content right", function () {
    var el = document.querySelector('#myDiv')
    expect(el).to.not.equal(null)
    expect(el.innerHTML).to.equal("test")
  })
})

mocha.run()


// const chai = require('chai')
// const expect = chai.expect


//es6
const createDiv = require('../index')


describe("Tests", function () {

   //	this.retries(2);  尝试 2
  // this.timeout(80); // 是否超时  this.timeout(0) 禁止掉超时时间的判断。    
   //this.slow(10);


  before(function () {
    createDiv('test')
  })

  beforeEach(function() {     //如果这段代码很耗时 下面的测试也会影响到    如果不想引入 done参数也要去掉
  	// this.timeout(3000); // A very long environment setup.
    //setTimeout(done, 2500);
	console.log('即将测试 ^_^');     
  })

  afterEach(function() {
  	console.log('测试结束 准备下一个测试 ^_^');
  })

  after(function() {
  	console.log('Tests所有测试结束 ^_^');
  })

  it("content right", function () {
    var el = document.querySelector('#myDiv')
    expect(el).to.not.equal(null)
    expect(el.innerHTML).to.equal("test")
    console.log('div');
  })

  it.skip('i will skip ',function() {
  	console.log('可以不用注释这段代码哦')  // skip方法用于跳过指定用例

  })

  it.only('如果不满足条件 我就跳过这个用例',function() {
  	// setTimeout(done, 300);
    this.retries(2);    // 失败后 继续执行 2次
  //	console.log('继续尝试测试 执行中...')
  	if(false) {
  		console.log('条件满足 正常测试')
  	}else{
  		this.skip();   // 跳过该测试
  	}
  })


  it.only('only run this',function() {
  	// setTimeout(done, 300);  //来判定是否超时
  	console.log('只会执行这个');    // only 方法  可以给多个子例绑定only 方法
  })
})



function add() {
  return Array.prototype.slice.call(arguments).reduce(function(prev, curr) {
    return prev + curr;
  }, 0);
}

describe('add()', function() {

 after(function() {
  	console.log('ADD所有测试结束 ^_^');
  })

  var tests = [
    {args: [1, 2],       expected: 3},
    {args: [1, 2, 3],    expected: 6},
    {args: [1, 2, 3, 4], expected: 10}
  ];

  tests.forEach(function(test) {
    it.only('correctly adds ' + test.args.length + ' args', function() {   // 如果前面的测试单元用了only方法这里也是不会被测试到的 所以也要加only
      var res = add.apply(null, test.args);
       expect(res).to.equal(test.expected)
    });
  });
});


const qual = function(val) {
	return val*2;
}




describe("chain 断言库学习",function() {
  after(function() {
  	console.log('chain所有测试结束 ^_^');
  })

	it.only("链式",function() {
		expect(qual(10)).to.equal(20);  // 肯定
		expect(qual(11)).to.not.equal(20);  //取反
	});

	it.only("obj test",function() {
		//const foo = {baz:'baz'};
		//expect({foo}).to.be.deep({baz:'baz'});

		//比较对象键值对
		//expect().to.be.have.deep.property('key','value');
		expect({foo: { bar: { baz: 'baz'}}}).to.not.have.deep.property('foo',"{ bar: { baz: 'baz'}}}"); 

		let foos = {bar:'baz',baz:'baa'};
		expect(foos).to.have.any.keys('bar','baz');   // any  期望有一个这样 key键
		expect(foos).to.have.all.keys('bar','baz');  // all  期望全部都是

    // a  或an  测试值类型
    expect('test').to.be.a('string');
    expect(foos).to.be.an('object');
    expect(null).to.be.a('null');
    expect(undefined).to.be.a('undefined');
    expect(new Error).to.be.an('error');


    //include 包含断言
    expect([1,2,3]).to.include(2);
    expect({a:1,b:2}).to.include.keys('a');


    //ok 断言目标为真
    expect('1').to.be.ok;

    //true  不会对类型进行转换
    expect('1').to.be.not.true;

    //false  不会对类型进行转换
    expect('1').to.be.not.false;

    //null undefined  
    expect(null).to.be.null;
    expect(undefined).to.undefined;

    //NAN
    expect('1').to.be.NAN;

    //exist  非null 非undefined
    let c = null,d = 1;
    expect(c).to.be.not.exist;
    expect(d).to.be.exist;

    //empty 判断目标长度 为空 length
    expect({c:1}).to.not.empty;

    //arguments
    function test1() {
      expect(arguments).to.arguments;
    }

    //equal(value)  严格等于

    expect(1+1).to.equal(2);
    expect({foo:'a'}).to.not.equal({foo:'a'});  // 不严格等于  对象地址不同
    expect({foo:'a'}).to.deep.equal({foo:'a'});  // 带有deep标记的  比较的是实际的value

    //eql(value)  相当于深度比较
    expect({foo:'a'}).to.eql({foo:'a'});


    //above 大于
    expect(3).to.above(1);
    //可以配合length使用
    expect('hahha').to.have.length.above(1);

    //least 大于等于
    expect(2).to.least(2);

    //below 小于
    expect(2).to.below(4);

    //most 小于等于
    expect(4).to.most(5);

    //within  测试区间内
    expect(4).to.within(1,6);


    let inst = function() {} , inst_ = new inst();

    //instanceof(constructor)  判断实例是否属于构造函数
    expect(inst_).to.instanceof(inst);


    //property(name,value)
    expect({foo:'baz'}).to.have.property('foo','baz');


    //ownProperty(name)  判断自身属性

    expect('strings').to.have.ownProperty('length');

    //.length


    //lengthOf(value)  期待的length值
    expect('111').to.have.lengthOf(3);


    //match(reg)  匹配正则
    expect('wahaha').to.match(/^wa/);


    //string(value)  判断字符串包含另一个字符串
    expect('wahaha').to.have.string('haha');


    //keys



    //throw  断言出错
    var fn = function () { throw err }

    expect(fn).to.throw(ReferenceError);



    //respondTo(method)  断言目标对象下有该方法

    inst.prototype.test = function() {};
    expect(inst).to.respondTo('test');
    //挂载itself方法   对象自身方法 而不是公共的
    expect(inst).itself.to.not.respondTo('test');



    //satisfy(fn)  给测试目标传入函数  返回期望值
    expect(2).to.satisfy(function(num) { return num > 1 });


    //closeTo(expect,范围)
    expect(1.5).to.closeTo(1,0.8);  //期望是1，但是只要在0.8范围内就好


    //members(set)  断言集合

    expect([1,2,3]).to.have.members([3,2,1]); 
    expect([1,2]).to.have.include.members([1]);


    //oneOf 断言位置
    expect(1).to.oneOf([1,2,3]);


    //change(object, property)   断言目标方法会改变指定对象的指定属性
    let fn1 = { val:2 };
    let fn2 = function() {  fn1.val++; };


    expect(fn2).to.change(fn1,'val');   //期待fn2能够改变fn1的属性val的值


    //increase (object, property)  断言目标方法会增加指定对象的属性
    let fn3 = { val:2 };
    let fn4 = function() {  fn3.val++; };

    expect(fn4).to.increase(fn3,'val');




    // decrease(object, property)   断言目标方法会减少指定对象的属性
    let fn5 = function() {  fn3.val--; };
    expect(fn5).to.decrease(fn3,'val');

   // .extensible  断言目标对象是可扩展的（可以添加新的属性）    .sealed 封闭
    expect({}).to.be.extensible;



    //.frozen   断言目标对象是冻结的（无法添加新的属性并且存在的属性不能被删除和修改）
    var frozenObject = Object.freeze({})

    expect(frozenObject).to.be.frozen
    expect({}).to.not.be.frozen
 
	})
})



























