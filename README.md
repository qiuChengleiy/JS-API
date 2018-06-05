# Js学习笔记 [持续更新]
 整理JS相关知识点和API 涉及到它的一些框架 方便复习 学习建议还是看文档~~~  

### 已整理好的内容  排版不是很细心 全为学习实际记录 见谅~~ 篇幅稍长 按需查找~~~
* <a href="#">JS相关API整理</a>
* <a href="#">JS设计模式学习笔记</a>
* <a href="#">JS Promise笔记</a>
* <a href="#">JQ相关API整理</a>
* <a href="#">typeScript学习笔记(还在更新中)</a>
* <a href="#">react学习笔记</a>
* <a href="#">vue 学习笔记</a>

## 原生javascript

### 节点
* [节点属性](jiedian.md)
* [操作](j_caozuo.md)
* [document节点](document.md)
* [Element节点](element.md)

### CSS操作
* [类名操作](style-name.md)
* [style操作](style.md)

### 对象
* [原生对象](obj.md)
* [Array对象](arr.md)
* [Number对象](number.md)
* [String 对象](string.md)
* [Math对象](math.md)
* [JSON对象](json.md)
* [console对象](console.md)

### js设计模式
```js
// js设计模式   参考：https://juejin.im/post/5afe6430518825428630bc4d

//1.单例模式
// 确保只有一个实例
//可以全局访问  适用于弹框的实现，全局缓存


const a = function(b,c) {
  this.b = b;
  this.c = c;
  this.instance = null;
}


a.prototype.getFunc = function() {
  console.log(this.b,this.c);
}


a.get = function(b,c) {
  if(!this.instance) {
    this.instance = new a(b,c);
  }

  return this.instance;
}


const exa1 = a.get('2','3');
const exa2 = a.get('4','3');
exa1.getFunc();

console.log(exa1 === exa2);  // true

//2.弹框实现

// 弹框创建
const createLogin = function(style) {
  if(document.querySelector('.inpu')) {
    return false;
  }else{
    const div = document.createElement('div');
    div.innerHTML = '<input name="username" class="inpu" type="text" value="123"/>123';
    div.style.display = style;
     document.body.appendChild(div)
    return div;
  } 
}

const getLogin = function(fn) {
  return function() {
     return  fn.call(this,'block');
  }
}


const createLayer = getLogin(createLogin);

document.onclick = function() {
    createLayer();  
}



//===============================   ============================

//2. 策略模式  根据不同参数可以命中不同的策略

// 能减少大量的 if 语句
// 复用性好

//对象中使用

const obj = {
  'A':function(value) {
    console.log(value*1);
  },
  'B':function(value) {
    console.log(value*2);
  },
  'C':function(value) {
    console.log(value*3);
  },
  'D':function(value) {
    console.log(value*4);
  },

}

const watcher = function(level,value) {
  return obj[level](value);
}

//TEST
watcher('C',1000);



//function

const fn1 = function(value) {
  console.log(value*1);
}


const fn2 = function(value) {
  console.log(value*2);
}

const fn3 = function(value) {
  console.log(value*3);
}

const watchers = function(level,value) {
  level(value);
}

watchers(fn3,1000);



//===============================   ============================

//3. 代理模式

// 代理模式的特点

// 代理对象和本体对象具有一致的接口，对使用者友好
// 代理模式的种类有很多，在 JS 中最常用的为虚拟代理和缓存代理。

//图片预加载

const myImage = (function() {
  const imgNode = document.createElement('img');
  document.body.appendChild(imgNode);
  return {
    setSrc: function(src) {      //注意代理的接口
      imgNode.src = src
    } 
  }
})();


const proxyImg = (function() {
  const img = new Image();
  img.onload = function() {
    myImage.setSrc(this.src);
  }

  return {
    setSrc: function(src) {
      myImage.setSrc('err.jpg');
      setTimeout(function() {
        img.src = src;   //模拟图片预加载
      },2000);
      
    }
  }
})()


console.log(proxyImg);

//在开发时候不要先去猜测是否需要使用代理模式，如果发现直接使用某个对象不方便时，再来优化不迟。
const loadingImg = proxyImg.setSrc('https://www.baidu.com/img/bd_logo1.png');


//累计乘法

const mult = function() {
  let a = 1;
  for(let i =0,l;l = arguments[i++];) {
    a = a * l;
  }
  return a;
}


const proxyMult = (function() {
  const cache = {};
  return function() {
    const tag = Array.prototype.join.call(arguments,',');
    if(cache[tag]) {
      return cache[tag];
    }
    cache[tag] = mult.apply(this,arguments);
    return cache[tag];
  }
})()


const resultss = proxyMult(1,2,3,4);

console.log(resultss);  // 24





//===============================   ============================



// 4迭代器模式

// 定义：能访问到聚合对象的顺序与元素

//内部迭代器

function each(arr,fn) {
  for(let i =0;i<arr.length;i++) {
    fn(i,arr[i]);
  }
}


each([1,2,3,4],function(i,n) {
  console.log(i);
  console.log(n);
})



const compare = function(arr,arr2) {
  each(arr,function(i,n) {
    if(arr2[i] !== n ) {
      console.log('不相等~~~')
    }
 })
  console.log('数组相等~~~')
}



compare([1,2,3,4],[1,2,3,4]);

//相较于内部迭代器，外部迭代器将遍历的权利转移到外部，因此在调用的时候拥有了更多的自由性，不过缺点是调用方式较复杂。


const itemtor = function(arr) {
  let current = 0;        // 注意不要用const 声明
  const next = function() {  //控制步骤
    return current= current + 1;
  }

  const done = function() {   //控制执行
    return current >= arr.length ;
  }

  const value = function() {
    return arr[current];    // 每一次益代的结果
  }

  return {
    next,
    done,
    value,
  }
}



const arr_1 = [1,2,3,4,5];
const arr_2 = [1,2,3,4,5];

const itemtor1 = itemtor(arr_1);
const itemtor2 = itemtor(arr_2);

const compares = function(item1,item2) {
  while(!item1.done() && !item2.done()) {
    if(item1.value() !== item2.value()) {
      console.log('数组不相等');
      return ;
    }
    item1.next();
    item2.next();
    
  }
  console.log('相等');
}


compares(itemtor1,itemtor2);



//===============================   ============================


//5 发布订阅模式

// 事件发布/订阅模式 (PubSub) 在异步编程中帮助我们完成更松的解耦，甚至在 MVC、MVVC 的架构中以及设计模式中也少不了发布-订阅模式的参与。

// 优点：在异步编程中实现更深的解耦

// 缺点：如果过多的使用发布订阅模式，会增加维护的难度


// 先订阅 在发布:
const Event = function() {
  this.obj = {};
}


Event.prototype.on = function(eventType,fn) {
  if(!this.obj[eventType]) {
    this.obj[eventType] = [];
  }

  this.obj[eventType].push(fn);
}


Event.prototype.emit = function() {
  let eventType = Array.prototype.shift.call(arguments);
    console.log(arguments);   // 1
    const arr = this.obj[eventType];

    for(let i=0;i<arr.length;i++) {
      arr[i].apply(arr[i],arguments); //触发订阅的函数
    }
}


const e = new Event();


e.on('click',function(e){    //订阅click 事件
  console.log(e);   
})



e.emit('click',1);    // 发布click
e.emit('click',2);    // 发布click


// 先发布 在订阅:   ||    按需要    

const Event = function() {
  this.obj = {};
  this.cache = [];
}


Event.prototype.on = function(eventType,fn) {
  if(!this.obj[eventType]) {
    this.obj[eventType] = [];
  }
  this.obj[eventType].push(fn);

  const arrObj = this.cache;
  console.log(arrObj);
  return {
    comit() {
      for(let i =0;i<arrObj.length;i++) {
        arrObj[i]();
      }
    }
  }
}


Event.prototype.emit = function() {
  const arg = arguments;
  const that = this;
  function Caches() {
    const eventType = Array.prototype.shift.call(arg);
    const arr = that.obj[eventType];
    for(let i=0;i<arr.length;i++) {
      arr[i].apply(arr[i],arg);
    } 
  }

  this.cache.push(Caches);
}

const e = new Event();

e.emit('clicks',2);

e.emit('clicks',1);


e.emit('clicks',1);


e.on('clicks',function(e) {    // 通通交给 on 来触发
  console.log(e);      
}).comit();




// 命令模式与策略模式有些类似，在 JavaScript 中它们都是隐式的。

// 重要性：较低


const setCommand = function(menu, command) {
  menu.onclick = function() {
    command.excute();
  }
}

//===============================   ============================

const up = {
  updateMeanu() {
    console.log('updates');
  }
}


const upCommand = function(receives) {
  return {
    excute:receives.updateMeanu,
  }
}


const updatecommand = upCommand(up);

//const btn = document.getElementById('btn');

//setCommand(btn,updatecommand);




//6组合模式


// 组合模式

// 组合模式在对象间形成树形结构;
// 组合模式中基本对象和组合对象被一致对待;
// 无须关心对象有多少层，调用时只需在根部进行调用;

const Command = function(){
   return {
    list:[],
    add(fn) {
      this.list.push(fn);
    },
    excute() {
      for(let i=0;i<this.list.length;i++) {
        this.list[i].excute();
      }
    }
   }
}


const c1 = Command();

c1.add({
  excute:() => console.log('1')
})

c1.add({
  excute:() => console.log('2')
})

c1.add({
  excute:() => console.log('2')
})
c1.add({
  excute:() => console.log('3')
})
c1.add({
  excute:() => console.log('4')
})
c1.add({
  excute:() => console.log('5')
})


c1.excute();


//除了上述那样  还可以  用对象实例来


//===============================   ============================





//7 模板方法模式

// 定义：在继承的基础上，在父类中定义好执行的算法。

const Cuttle = function() {};

Cuttle.prototype.water = function() {
  console.log('烧水');
}

Cuttle.prototype.second = function() {
  //console.log('添加');
}


Cuttle.prototype.push = function() {
  console.log('倒水');
}

Cuttle.prototype.last = function() {
  //console.log('添加');
}

Cuttle.prototype.choose = function() {
  return true;
}


Cuttle.prototype.init = function() {
  this.water();
  this.second();
  this.push();
  //this.last();
  // 有时候 我们得让用户自己去选择 加还是不加
    this.choose() ? this.last() : console.log('不了谢谢');
}




const Tea = function() {};

Tea.prototype = new Cuttle();

Tea.prototype.second = function() {
  console.log('我要放茶叶')
}


Tea.prototype.last = function() {
  console.log('我还加点拧蒙')
}

const Coffe = function() {};
Coffe.prototype = new Cuttle();

Coffe.prototype.second = function() {
  console.log('我要放咖啡')
}

Coffe.prototype.last = function() {
  console.log('还要加点糖');
}

//这个客户的选择
Coffe.prototype.choose = function() {
  return window.confirm('您确认要加吗？');
}

const tea = new Tea();
const coffe = new Coffe();

tea.init();
coffe.init();




//===============================   ============================




// 享元模式是一种优化程序性能的模式，本质为减少对象创建的个数。

// 以下情况可以使用享元模式：

// 有大量相似的对象，占用了大量内存
// 对象中大部分状态可以抽离为外部状态


const classA = function(gnder) {
  this.gnder = gnder;
}


classA.prototype.wear = function() {
  console.log(`${this.gnder}穿着${this.under}`) ;
}

const male = new classA('male');
const female = new classA('female');


for(let i=0;i<51;i++) {
  male.under = `${i}衣服`;
  male.wear();
}

for(let i=0;i<51;i++) {
  female.under = `${i}衣服`;
  female.wear();
}



//===============================   ============================



// 职责链模式

// 职责链模式：类似多米诺骨牌，通过请求第一个条件，会持续执行后续的条件，直到返回结果为止。

// 场景：某电商针对已付过定金的用户有优惠政策，在正式购买后，已经支付过 500 元定金的用户会收到 
// 100 元的优惠券，200 元定金的用户可以收到 50 元优惠券，没有支付过定金的用户只能正常购买。


const order500 = function(ordertype,pay,stock) {
  if(ordertype == 1 && pay == true) {
    console.log('您已经预定并且支付 将获得 500优惠券')
  }else {
    order200(ordertype,pay,stock);
  }
}


const order200 = function(ordertype,pay,stock) {
  if(ordertype == 2 && pay == true) {
    console.log('您已经预定并且支付 将获得 200优惠券')
  }else {
    common(ordertype,pay,stock);
  }
}

const common = function(ordertype,pay,stock) {
  if(ordertype == 3 && stock > 0) {
    console.log('您已经预定并且支付')
  }else {
    console.log('对不起 库存没有更多了')
  }
}



order500(3,true,500);


//===============================   ============================


//中介者模式：对象和对象之间借助第三方中介者进行通信。


const player = function(name) {
  this.name = name;
  mid.add(name);
}


player.prototype.win = function() {
  mid.win(this.name);
}

player.prototype.lose = function() {
  mid.lose(this.name);
}



const mid = (function() {
  const players = [],
       winArr = [],
       loseArr = [];

     return {
      add(name) {
        players.push(name);
      },
      win(name) {
        winArr.push(name);
        this.show()
      },
      lose(name) {
        loseArr.push(name);
        this.show();
      },
      show() {
        for(let win of winArr) {
          console.log(win+'wind');
        }

        for(let lose of loseArr) {
          console.log(lose+'lose');
        }
      }
     }
})();


const al = new player('A 选手')
const bl = new player('B 选手')
const cl = new player('C 选手')

al.win()
// bl.win()
// cl.lose()






//===============================   ============================

// 装饰者模式

// 装饰器模式：动态地给函数赋能。


let wears = function() {
  console.log('穿一件把')
}

let wear_1 = wears;

wears = function() {
  wear_1();
  console.log('在穿一件一把');
}


let wear_2 = wears;

wears = function() {
  wear_2();
  console.log('就最后一件 了')
}

wears();



//AOP  装饰函数

Function.prototype.before = function(fn) {
  const self_ = this;
  return function() {
    fn.apply(this,arguments);
    return self_.apply(this,arguments);
  }
}

Function.prototype.after = function(fn) {
  const self_ = this;
  return function() {
    fn.apply(this,arguments);
    return self_.apply(this,arguments);
  }
}

//上述会污染 全局函数


const after = function(fn,afterFn) {
  return function() {
    fn.apply(this,arguments);
    afterFn.apply(this,arguments);
  }
}

const wear_ = after(after(w1,w2),w3);



//===============================   ============================





// 状态模式

// 状态模式：将事物内部的每个状态分别封装成类，内部状态改变会产生不同行为。

// 优点：用对象代替字符串记录当前状态，状态易维护

// 缺点：需编写大量状态类对象

// 将状态封装成不同类
const weakLight = function(light) {
  this.light = light
}

weakLight.prototype.press = function() {
  console.log('打开强光')
  this.light.setState(this.light.strongLight)
}

const strongLight = function(light) {
  this.light = light
}

strongLight.prototype.press = function() {
  console.log('关灯')
  this.light.setState(this.light.offLight)
}

const offLight = function(light) {
  this.light = light
}

offLight.prototype.press = function() {
  console.log('打开弱光')
  this.light.setState(this.light.weakLight)
}

const Light = function() {
  this.weakLight = new weakLight(this)
  this.strongLight = new strongLight(this)
  this.offLight = new offLight(this)
  this.currentState = this.offLight          // 初始状态
}

Light.prototype.init = function() {
  const btn = document.createElement('button')
  btn.innerHTML = '按钮'
  document.body.append(btn)
  const self = this
  btn.addEventListener('click', function() {
    self.currentState.press()
  })
}

Light.prototype.setState = function(state) { // 改变当前状态
  this.currentState = state
}

const light = new Light()
light.init()

// 打开弱光
// 打开强光
// 关灯



//===============================   ============================


// 适配者模式

// 适配者模式：主要用于解决两个接口之间不匹配的问题。

// 老接口
const zhejiangCityOld = (function() {
  return [
    {
      name: 'hangzhou',
      id: 11,
    },
    {
      name: 'jinhua',
      id: 12
    }
  ]
}())

console.log(getZhejiangCityOld())

// 新接口希望是下面形式
{
  hangzhou: 11,
  jinhua: 12,
}

// 这时候就可采用适配者模式
const adaptor = (function(oldCity) {
  const obj = {}
  for (let city of zhejiangCityOld) {
    obj[city.name] = city.id
  }
  return obj
}())


```

### js promise

```js
console.log('111');

const p1 = new Promise((resolve,reject) => {
  const value = 'hello';
  resolve(value);
  //setTimeout(reject(value),1000);
});

p1.then(data => {
  console.log(data);  // success
  return data+'world';
}, err => {
  console.log(err);   // 返回的是 reject(value) 的值
  return err+'err';
}).then(data => {
  console.log(data); // helloworld 继续上一次data的返回值  如果没有 就返回undefined
},err => {
  console.log(err);   // helloerr 同理 继续返回上一次err的返回值
})


// 通常使用 catch来捕捉异常

p1.then(data => {
  console.log(data);
  return data+'world';
}).catch(err => {
  console.log(err);  // hello
  return "reject";
}).then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);  // reject 
})



//promise.all()  传入的是一个数组

const arr = [1,2,3,4];

const promiseArr = arr.map(arg => {
  return new Promise((resolve,reject) => {
    if(arg) {
      resolve(arg*2);
    }else{
      reject('no value');
    }
  })
});



Promise.all(promiseArr).then(data => {
  console.log(data);  // [2,4,6,8]
}).catch(err => {
  console.log(err); 
})


//Promise.race

const pro1 = new Promise((resolve,reject) => {
  setTimeout(resolve,100,'1');
});

const pro2 = new Promise((resolve,reject) => {
  setTimeout(resolve,200,'2');
});

const pro3 = new Promise((resolve,reject) => {
  setTimeout(resolve,300,'3');
});

const pro4 = new Promise((resolve,reject) => {
  setTimeout(resolve,10,'4');
});


Promise.race([pro4,pro1,pro2,pro3]).then(data => {
  console.log(data);  // 1   输出最快的那个
}).catch(err => {
  console.log(err);
})


//两种实例状态  Promise.resolve Promise.reject


const p_1 = Promise.resolve('success');

p_1.then(data => {
  console.log(data); // success
})

const p_2 = Promise.reject('err');

p_2.then(data => {
  console.log(data);   
}).catch(err => {
  console.log(err);  // err
})


console.log(document.querySelector('div'));

```


## JQuery
```js
//dom 操作
	$("div").addClass('box');
	$('div').attr({id:"bax",alt:'jquery-3'});
	$('div').attr('style',()=>{
		let a = 'background-color:blue';
		return a;
	});
	console.log($('.fater').after())
	$('div[3]').css('width','150PX');
	console.log($('.ba').text());
	$('.ba').html('<h1>wahahah</h1>')
	$('div').removeAttr('style');
	$('div').removeClass('box');

	$('.ba').text('nihao');
	$('.ba').toggleClass('box');

	//$('input').val('111');
    $('.ba').after('this is after');
    //.ba. inner append
    $('.ba').append('this si ?');
    $('.ba').before('haha is before');
    console.log( $('.ba').appendTo());
    //some elment into new elements
    $('.ba').appendTo($('.fater'));
   //clone and appendTo 
    $('.ba').clone(true).appendTo($('div')[0]);

    $('div').empty();
    //some element is remove now ; palce chaneged
     $('.fater').insertBefore($('div')[1]);
     //...insertAfater(
     is before and is. inner
    $('input').prepend('wahaha');
    $('input').prependTo($('div')[0]);
    remove .ba elements
    $('div').remove($('.ba'));
     remove all elements
    $('div').remove();

    // is wraping  and wrap only one
      $('#bax').wrap('<div></div>');
      $('#bax').wrap($('span')[0]);




// bian li functions 遍历方法
      $('div').add('p').html('jihe bian li');
     console.log(  $('div').add('p'))
     //only sample elements can 
     console.log($('span').children('.odiv'));
     //costainer  contained
     console.log($.contains(document.documentElement,document.body));

     //end  lianshi diaoyong
     $('.spans').find('.aa').css('background','blue').find('.bb').css('background','green'); // only find aa
      $('.spans').find('.aa').css('background','blue').end().find('.bb').css('background','green');// aa and bb

     //filter
    // $('li').filter(':even').css('background','blue');
    // only functions  not ()=>()
     $('li').filter(function(index){
     	return $('span',this).length==1;
     }).css('background','red');

     const list = $('li').is(function(index) {
     	return $('span',this).length ==1;
     });
     console.log(list); //true  is charge

     //next jin tongbao yuansu
     console.log($('span').next('.spans'));

     //from  remove jihezhongde elements
     $('li').not(':even').css('background','black');

     //parent and parents
     console.log($('.aa').parent('.spans'));
     //more elements
     console.log($('.aa').parents());

     //prev
     console.log($('li').prev('.qq'));
     //siblings except .qq
     $('li.qq').siblings().css('background','orange');
   //each 将匹配到的元素执行相应的函数
     const nums = $('li').click(function() {
         $('li').each(function() {
         	console.log($(this).text());
         })
     });
   console.log(nums);

   //eq()  相当于index，将匹配到的选取对于的元素
   $('div').eq(2).css('background','red');



//next 
const formsa = $(':radio').eq(1).next();  //only one
//nextAll()
const formsa1 = $(':radio').eq(1).nextAll(); 

console.log( $(':radio').eq(1).prev()) // before
console.log($(':radio').eq(2).prevAll()) // one and two

//andSelf() is remove this method
console.log($(':radio').andSelf());


console.log(formsa,formsa1);






    // 方法的扩展  后面的覆盖前边的
    const obj1 = {name,age:'1'};
    const obj2 = {sex:'fa',age:'2'};
    console.log($.extend({},obj1,obj2));
    $.extend({
    	test:function() {console.log('ok')},
    	net:{}
    });
    $.extend($.net,{},{});

    $.test(); // ok
    //扩展到实力对象中
    $.fn.extend({
    	hello:function() {console.log('hello')}
    });
    $(document).hello();// hello 

    //深度拷贝
    const result = $.extend(true,{name:'tom',location:{city:"jiangsu",conun:"1"}},{sex:'nv',location:{city:'nanjing'}});
    console.log(result);



//events 如果绑定的同一个函数他会先后执行函数
  $('input').bind('click',function() {
  	 console.log('hah');
  });

  $('input').bind('mouseout mouseover',function() {
  	console.log('11111');
  });
  
  //mouseleve mouseenter kepress(keydown keyup)...
  $('input').bind({
  	click:function() {console.log('all')},// dbclick
  	mouseover:function() {console.log('wahaha')},
  	mouseout:function() {console.log('xishuashua')},
  	blur:function() {console.log('blur')},//离开焦点
    focus:function() { console.log('i would') },
  	change:function() {console.log('changed')},//按回车键发触发函数，不会触发焦点事件
    keydown:function(event) {console.log(event.keyCode)},//te shu jian
  });
 
//hover(fn_in,fn_out)
$('textarea').hover(function() {
  console.log('fn_in');
},function() {
  console.log('fn_out')
})


//toggle(fn1,fn2);  新版本已经把该方法废除 使用会导致元素消失


const toggles = () => {
$('img').toggle(function() {
  $('textarea').attr('rows',11);
},function() {
  $('textarea').attr('rows',8);
})};


$('img').bind('click',toggles);

$('img').triggerHandler('click');



//input events | textarea
//select() 方法用当用户选中文本时 
$('textarea').bind('select',function() {
  alert('需要指定trigger来激活');
  $('textarea').after('请您输入信息');
})

//trigger and  triggerHandler()
//第二者不会发生事件冒泡，并且只会执行时间对象元素集合中的第一个元素，并且不会发生浏览器的默认行为，比如submit的表单提交
$('[name="name1"]').bind('click',function() {
  $('textarea').trigger('select');
  //实现了触发了input元素上的所有事件
 // $('input').trigger('click');
 //原生 event.preventDefault()
  $('input').triggerHandler('click');

})



$('form').bind('submit',function() {
  console.log('push')// enter .... can and not need button
})
 
//load 适用于各种URL场景
//新版本移除了load onload erro
$('img').bind('load',function() {console.log('所有图片加载完毕')});
//需要用on / bind来绑定事件(只对于ajax请求资源时 本地测试无效)
$('img').on('load',function() {console.log('图片加载完毕')})


//unload 只适用于window对象 confirm 不能用于离开页面时使用


//error

$('img').on('error',function() {
  $(this).replaceWith('<p>img url is error</p>')
});

//repaceWith(fn|contents) repaceAll() 第二者不能用函数返回


//one() 方法只执行一次
$(window).one('click',function() {
  console.log('方法只执行一次')
})



//resize 浏览器窗口事件
$(window).bind('resize',function() {console.log('窗口发生变化')})

//scroll 适用于所有滚动的元素 包括window对象
$(window).on('scroll',function() {console.log('滑动中...')})



 //method1
$(window).on('beforeunload',function() { 
  // confirm('您确定要离开此页面吗?')?console.log('离开了'):console.log('保留在此页');
  //在部分浏览器中 unload事件中 alert是被禁止的所以用一下方法解决,必须要有返回值；
    $('div').css('background','black');
    return '???'
 
})

 //method 2
$(window).on('beforeunload',function(event) {
  $('div').css('background','red');
//  event.returnValue = 'is leave ?'
 // return 'is leave';
})


 $('strong').delegate('.uls','click',function() {
 	console.log('delegate');
 })

 $('strong').on('mouseover','.uls',function() {
 	console.log('on')
 });

 //解绑事件
 $('li').unbind('click');
 $('strong').undelegate('.uls','click');
 $('strong').off('mouseover','.uls');






//获取表单的数据 selected：是否选中
//se// // //method1
$(window).on('beforeunload',function() { 
  // confirm('您确定要离开此页面吗?')?console.log('离开了'):console.log('保留在此页');
  //在部分浏览器中 unload事件中 alert是被禁止的所以用一下方法解决,必须要有返回值；
    $('div').css('background','black');
    return '???'
 
})

// //method 2
$(window).on('beforeunload',function(event) {
  $('div').css('background','red');
//  event.returnValue = 'is leave ?'
 // return 'is leave';
})lect可以自定义css属性 
$('select').bind('change',function() {
  console.log($(this).val());
  //事件触发后第二个选项处于选中状态
  $('select option').eq(1).attr('selected','selected')
})
// checked用于判断是否被选中
$('#forms input').bind('click',function() {
  console.log($(this).val(),$(this).filter(':checked'));

})

//textarea API
//页面加载后自动获取焦点
$('textarea').attr('autofocus','autofocus');

$('textarea').attr({
  rows:7,//高
  cols:20,//宽
  disabled:true,
  form:'forms',//规定隶属于指定id表单的一部分
  maxlength:100,//规定可输入区域最大100字符
  name:'form',//规定名称，可以被js获取数据
  placeholder:"请您输入信息",//占位信息
  readonly:'信息只读',//不可修改，用户可以复制文本
  required:true,//规定必填项
  wrap:'soft'|'hard'// 默认着，不换行 | 当在表单中提交时，textarea 中的文本换行（包含换行符）。
//当使用 "hard" 时，必须规定 cols 属性。
});

```



## TypeScript 

```js

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




```

### React

```js
1.react 渲染组件时只能渲染创建DOM到根节点上。
   let h1 = React.createElement(
            'h1',
            {
                title:'你好',
            },
            'welcome react'
        );
        ReactDOM.render(h1,document.getElementById('app'),() => {
            alert('')
          //  ReactDOM.render(h3,document.getEelmentById('app2'));
        });

2.  let Ul = React.createElement(
          'ul',
          null,
          React.createElement(
              'li',
              null,
              '女装/男装/'
          ),
          React.createElement(
              'li',
              null,
              '童装/玩具/'
          )
      );

     //将虚拟DOM 渲染到页面
        ReactDOM.render(Ul,document.getElementById('app'));
        ReactDOM.render(Ul,document.getElementById('app2'));

3.组件
 
      let Components = React.createClass({
          render() {
        //       return React.createElement('apps',null,
        //         React.createElement(
        //             'div',
        //             null,
        //             '我是组件1'
        //         ),
        //         React.createElement(
        //             'div',
        //             null,
        //             '我是组件2'
        //         )
        //       )
        //   }

        //JSX
            return(
                <div>
                 <div>我是组件1</div>
                 <div>我是组件2</div>
                 </div>
            )
          }
      });

     //let DOMs = React.createElement(Components);
      //jsx
      let DOMs = (<Components />);
      ReactDOM.render(DOMs,document.getElementById('app'));

4.状态...此处略写
  
          //状态机制
         getInitialState() {
             return {count:0};
         },     
         click() {
             this.setState((state) => {
                  return {
                      count:state.count+1
                  };
             });
         },
         return(
                <div>
                 <button onClick = {this.click}>当前次数为：{this.state.count}</button>
                 <div>我是组件1</div>
                 <div>我是组件2</div>
                 </div>
            )

5.列表渲染
   lists() {
             let arr = [1,2,3,4,5];
            return arr.map((index,value) => {
                  return(
                      <li key={index}>{value}</li>
                  ) 
             })
         },

6.属性props传值  
  
     //默认属性
   getDefaultProps() {
           return {
               user:'0'
           }
        },
  获取：this.props.user

  父组件向子组件： props
  子组件向父组件： 利用props向子组件传递回调函数，子组件触发函数
<div id="correspond"></div>

<!--js代码-->
<script type="text/babel">
    ///子组件
    var HelloMessage = React.createClass({
        childMethod: function(){
            alert("组件之间通信成功");
        },
        render: function() {
            return <div> <h1>Hello {this.props.name}</h1>  <button onClick={this.childMethod}>子组件</button></div>
        }
    });

    //父组件
    var ImDaddyComponent = React.createClass({
        getDS: function(){
            //调用组件进行通信
            this.refs.getSwordButton.childMethod();
        },
        render: function(){
            return (
                    <div>
                        <HelloMessage name="John" ref="getSwordButton" />
                        <button onClick={this.getDS}>父组件</button>
                    </div>
            );
        }
    });

    ReactDOM.render(
            <ImDaddyComponent  />,
            document.getElementById('correspond')
    );

</script>



7.样式
   let styles = {
               border:'none'
           }
   style = {styles}

8.生命周期：
    //将要构建组件
         componentWillMount() {
             console.log('我要开始构建组件啦');
         },

  //构建完成
          componentDidMount() {
             console.log('构建好了，让我来查询一下')
             let info = ReactDOM.findDOMNode(this);
             console.log(info,this.state,this.props);
             //构建完成后的状态无法修改
            // this.state = {
            //     count:0
            // }
            //  this.props.user = ;
            info.style.border = '1px solid red';
          }
      });

    //存在期
            componentWillReceiveProps(){  //1.接受属性
                console.log('1 接受属性')
            },
            shouldComponentUpdate(){      //2.是否应该更新 必须有返回值
                console.log('2 更新 ')
                return true;
            },
            componentWillUpdate() { //3 组件将要更新
                console.log('3 组件将要更新')
            },
            //第四个阶段渲染dom render 方法已经被定义
            componentDidUpdate(){//5.组件更新完成
                console.log('5.组件更新完成')
            }

9. goSearch(e){
                //这里的事件对象e只能获取span元素 想要获取input  可以通过rel属性来获取input
                //获取input
                let inp = this.refs.serInt;
                console.log(inp.value)
            },
            render(){
                let count = {
                    __html: '<span style="color: red; display: inline-block;width: 30px;">高级搜索</span>'
                }
                return (
                    <div className="search">
                        <input ref="serInt" type="text"/>
                        <span onClick={this.goSearch}>搜索</span>
                        {/*内容样式通过dangerouslySetInnerHTML设置*/}
                        <span dangerouslySetInnerHTML={count}></span>
                    </div>

10.ajax(jquery)

//一定要注意先渲染组件然后拿到数据在渲染视图，调用AJAX时要注意箭头函数

componentDidMount: function () {
            $.ajax({
                url: this.props.source,
                dataType:'jsonp',
                cache:true,
                success:(res)=>{
                    this.setState({
                        dataUrl:this.props.source,
                        arrData:res.subjects
                    })
                }
            })
        },
        render: function () {
            console.log(this.state.arrData);
            return (
                    <div>
                        <div>数据接口地址:<a href={this.state.dataUrl}>{this.state.dataUrl}</a></div>
                        <ul>
                            {this.state.arrData.map((value,index)=> {
                                return (<li key={index}>{value.title}</li>)
                            })}
                        </ul>
                    </div>
            );
        }
    });
    ReactDOM.render(
            <DataList source="https://api.douban.com/v2/movie/top250?count=7'"/>,
        document.getElementById('app')
    );


11.面向对象与继承：react组件高级写法
  class Test extends React.Component {
        constructor(...args) {
            super(...args);
            this.state = {a: 12};

        }

        fn() {
            this.setState({
                a: this.state.a+1
            })
        }

        render() {
            return <div>
                <span>{this.state.a}</span>  //必须绑定this
                <input type="button" value="按钮" onClick={this.fn.bind(this)}/>
            </div>
        }
    }

    window.onload = function () {
        ReactDOM.render(
                <Test/>,
            document.getElementById('app')
        )
    }


12.React-Router-dom使用：
      在jsx中一定要注意元素的包裹，只允许有一个根元素
      工程创建：react 构建工具
          npm install -g create-react-app
		create-react-app demo-app
		cd demo-app
           路由安装：
              npm install react-router-dom --save

      必要模块导入：
        import React from 'react'
	import {
	  BrowserRouter as Router,
	  Route,
	  Link
	} from 'react-router-dom'
     
      基本用法：
            允许class类写的组件插入,注意包裹关系就行
          let compnent = () => (
                     <Router>
			<a><Link to='/patch'>这里需要跳的路径</Link></a>

                        <Route patch='/patch' component={my component注意大小写:这里渲染当前路径对应的模板}>
                     </Router>
		);
            二次子路由传入{match}对象   可以用模板字符串: 路由解析：match.params. (url参数)

              const Topics = ({ match }) => (
		  <div>
		    <h2>Topics</h2>
		    <ul>
		      <li>
			<Link to={`${match.url}/rendering`}>
			  Rendering with React
			</Link>
		      </li>
		      <li>
			<Link to={`${match.url}/components`}>
			  Components
			</Link>
		      </li>
		      <li>
			<Link to={`${match.url}/props-v-state`}>
			  Props v. State
			</Link>
		      </li>
		    </ul>

		    <Route path={`${match.url}/:topicId`} component={Topic}/>
		    <Route exact path={match.url} render={() => (
		      <h3>Please select a topic.</h3>
		    )}/>
		  </div>
		)

		const Topic = ({ match }) => (
		  <div>
		    <h3>{match.params.topicId}</h3>
		  </div>
		)


  路由认证功能：

                import React, { Component } from 'react';
		import {
		  BrowserRouter as Router,
		  Route,
		  Link,
		  Redirect,
		  withRouter
		} from 'react-router-dom'
		import { setTimeout } from 'timers';

            <li><Link to='/protected'>需要登录才能看到</Link></li>
	    <PrivateRoute path='/protected' component={Protected}/> 
	    <Route path='/login' component={Login}/>

	    //认证功能：

		//进行对象判断

		const judge = {
		    islogin:false,
		    login(cb) {
		       this.islogin = true;
		       setTimeout(cb,100);
		    },
		    logout(cb) {
			this.islogin = false;
			alert('')
			setTimeout(cb,100);
		    }
		}

             
		class Login extends Component{
		    state={
			redirectToReferrer:false
		    }
		    logins = () =>{
			judge.login(() => {
			    this.setState({redirectToReferrer:true})
			})
		    }

		    render() {
			const {from} = this.props.location.state || {from:{pathname:'/'}}
			const {redirectToReferrer} = this.state;

			if(redirectToReferrer){
			    return(
				<Redirect to={from} />
			    )
			}
			return(
			    <div>
				<p>你必须登录后才能看到内容</p>
				<button onClick={this.logins}>Log IN</button>
			    </div>
			)
		    }
		}

		const Protected = ()=>(
		     <h1 style={{color:'red'}}>protected</h1>
		)


		const PrivateRoute = ({component: Component,...rest }) => (
		      <Route {...rest} render={props => (
			  judge.islogin?(
			      <Component {...props}/>
			  ):(
			      <Redirect to={{
				  pathname:'/login',
				  state:{from:props.location}
			      }}/>
			  )
		      )}/>  
		 )

		  //调用对象withRouter //注意返回
		const Showpage =withRouter(({history}) => {
		    return(
		   judge.islogin?(
		       <div>
		       welcome!<button onClick={
			   () => {judge.logout(() => history.push('/'))} 
		       }>sign out</button>
		       </div>
		   ):(
		       <p>你还没有登录哦</p>
		   ))   
		});
		    
react-redux状态管理机制：
	1.步骤

	定义 UI 组件。规划组件属性 this.props，组件属性包括【展示属性】和【绑定事件】
	定义组件通信。包括【展示数据】到 state 的映射、【绑定事件】到 dispatch 的映射
	将 UI 组件包装成容器组件
	定义容器组件的 Reducer
	生成 Store 对象，并使用 Provider 在根组件外面包一层

简单实例：

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

// React component
class Counter extends Component {
  render() {
    const { value, onIncreaseClick } = this.props
    return (
      <div>
        <span>{value}</span>
        <button onClick={onIncreaseClick}>Increase</button>
      </div>
    )
  }
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncreaseClick: PropTypes.func.isRequired
}

// Action
const increaseAction = { type: 'increase' }

// Reducer
function counter(state = { count: 0 }, action) {
  const count = state.count
  switch (action.type) {
    case 'increase':
      return { count: count + 1 }
    default:
      return state
  }
}

// Store
const store = createStore(counter)

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.count
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction)
  }
}

// Connected Component
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)


```

### vue
```js

 // 1. v-model 数据的双向绑定 一般用来处理表单的数据，它会默认bind表单的val,只支持input元素

       v-once 数据只绑定一次  v-html html转义
    2.v-for 遍历数据列表： $index 为数据的index $key为json格式的key值 新版本中$index不支持 ，需(k,v,index)
      :key="item.id" 必须的
    3.v-on:click/mouseover/mouseout....="fn(a,$event)"> 事件绑定： 方法统一写到methos ,
                   可以传入特殊变量$event    简写：@click/... 
          与过滤器的配合： 系统自带：  debounce 延迟加载： vue2.0已经移除
                _.debounce(fn,time)    _is not defined???? 
      事件修饰符： @click.stop:  阻止事件冒泡
                   @click.prevent  阻止事件默认行为
                   @click.capture  事件捕获
                   @click.self   只有事件在本身时触发回调
                   @click.once   事件只会触发一次
    键盘事件：@keydown @keyup
              @keyup.enter 
              @keyup.tab
              @keyup.delete
              @keyup.esc
              @keyup.left....
           ***自定义修饰符：Vue.config.keycodes.f1 = 112;
           * Vue.config.keyCodes.k= 112;有问题   console.log(ev.keyCode);传入$event可以获取键盘码
           * 合并键： keyup.alt.67 / alt+c  @click.ctrl 鼠标加ctrl 只有同时触发才能生效
           * keyup.ctrl 只有松下ctrl时触发，然而在没有其他键松下的情况下
           * 2.5新增：.exact 精准匹配符 @click.ctrl.exact 只有在按住ctrl情况下鼠标才能触发事件
    4.v-show="data" data为true/false 相当于display 用来显示或者隐藏
        切换boolean this.blloean =!this.blooean
      v-if与 v-else  条件渲染   v-else-if 连着用的 

    5.v-bind/:  绑定样式： ：style='data'  data为js对象 
                class的绑定   true/false  可以是json形式data{a:true,b:false} :class='data' 最终绑定a
    6.filter: {{msg | filt1 | filt2 | filt('a','b')}}  传入的参数:1>msg 2>a 3>b
              更多的是用原生的方法解决：
                  v-for='msg in computedMsg'  computed:{ fn(){  msg.filter(fn(){return age>= 20})}}

    7.数据交互：首先要引入 vue-reource.js >>>>>>>待深入学习

    8.生命周期：钩子函数： created / mounted /updated /destroyed  不能与箭头函数一起用 注意this
                          before+name 在这之前触发
    9.计算属性和观察者：
       computed:数据受多个数据影响，它也是绑定的一个数据  注意里面的数据要return，默认调用vm.get方法
                它只会缓存上次的数据，并不会更新，因为它的数据是依赖的
                 set方法需要外部传入： app.name = 'some';
       watch: 一个数据的变化影响其他多个数据，浅层的监听只能监听表面的数据  $watch('',fn,{deep:true})
    10:console.log(app.$el,app.$data,app.$options,app.$destroy,app.$log); 实例的一些方法 作用不大
        app.$mount('el') 挂在dom   $watch('',fn,{deep:true}) 深度监听 可以监听对象的数据变化 

    11.自定义指令：
           全局：Vue.directive('name',{
	           inserted(el){
	              /....
	           }
           })
           局部： directives:{   ///// vue2.0
	                name:{
	                    inserted(el,value){ 可以传参数  v-name='msg'  value.value = msg
	                           //el.....
	                    }
	                }
           }
        自定义提供的钩子函数：update/inserted/bind/unbind(解绑时)/componentUpdated 
        拖拽功能：  当离开时：document.onmouseup = {this.onmousemove =null; }
 */




var app = new Vue({
	data:{
		msg:'<h1>我是标题</h1>',
		arr:['小明','小李','小红'],
		jsons:{
			'name':'hh',
			'age':'20',
			'sex':'nv'
		},
		keycodes:2,
		views1:{
			width:'100px',
			height:'100px',
			border:'1px solid red',
			background:'red',
			position:'absolute'
		},
		views:{
		    width:'100px',
			height:'100px',
			right:0,
			top:0,
			background:'red',
			position:'absolute'
		},
		src:'dom.jpg',
		classa:{
			red:true,
			green:false
		},
		filt:'hellWo VVuuee'
	},
	methods:{
		console:function(){
            this.classa = {red:false,green:true}
			console.log('我是vue处理的事件',this.keycodes)
			return
		},
		keyevent:function(ev){
           console.log(ev.keyCode);
		},
		get:function(){
			this.$http.get('lib/hello.txt').then(function(res){console.log(res.data);},function(res){
				console.log(res.status);
			})
		}
	},
	watch:{
		classa:function(){
           this.views1.width = '200px'
		}
	},
	filters:{
		reg:function(value){
			let pattern = /^[a-z]/;
			let str = value;
			let newStr = str.replace(pattern,function(){
				return value.valueOf();
			});

			return newStr;
		}
	},
	created:function(){
		//alert('欢迎来到vue2.0')  //实例创建时触发
	},
	computed:{
		resrveMsg:function(){
			return this.msg.split('').reverse().join('');
		},
		scops:{
			get:function(newValue){
				return this.arr[0]+this.arr[1];
			},
			set:function(newValue){
                let name = newValue;
                let names = name.reverse();
                this.arr = names;

			}
		}
	},
	directives:{
		red:{
			inserted(el,value){
              //   alert(el);
             console.log(value.value) // 可以传入参数 v-red='参数对象'
			},
			bind(el,value){
               console.log(value);  // 同上
			},
			update(el,value){
                console.log(value);  // 没更新时 不调用
			}
		},
		drag:{
			inserted(el){               
                el.onmousedown = function(ev){        	
                	var divX = ev.clientX-el.offsetLeft;
                    var divY = ev.clientY-el.offsetTop;
                    document.onmousemove = function(ev){
                          var l = ev.clientX-divX;
                          var t = ev.clientY-divY;
                          el.style.left = l+'px';
                          el.style.top = t+'px';
                    };
                    document.onmouseup = function(){
                         this.onmousemove =null;
                    }
                }
			}
		}
	}
}).$mount('#test');
app.scops = ['小明','小李','小红']  //外部传入newVlaue
console.log(app.$el,app.$data,app.$options,app.$destroy,app.$log);
//console.log(app.methods) //外部调用methods 是undefined



  包管理： npm install bower -g
            bower install vue#1.0.28 
       vue过渡动画:
          渐变切换： 配合css3动画
          animated库的使用：  class: animated 动画名称 （官网都可以查到)
          和vue的配合：vue2.0:
            <transition name='myname' enter-active-class='' leave-active-class=''>
              /....element
            </transition>
          :duration='{enter:1000,leave:1000}'  无效  2.0.  待查询
          配合声明的钩子函数：
            <transition v-on:before-enter='beforeEnter'  v-on:before-leave='beforeLeave
            <transition
             v-on:before-enter="beforeEnter"
             v-on:enter="enter"
             v-on:after-enter="afterEnter"
             v-on:enter-cancelled="enterCancelled"
              v-on:before-leave="beforeLeave"
            v-on:leave="leave"
             v-on:after-leave="afterLeave"
             v-on:leave-cancelled="leaveCancelled"
           后面的方法写到mehtods中
>
  <!-- ... -->
</transition>' 
          复杂的动画 比如轮播图等需要和实际需求相关的 可以放在mehtods中和事件绑定， 直接调用可以当实例被创建的时候调用 created
  */

var a = 1;

var app = new Vue({
	data:{
       view1:{
       	  width:'100px',
       	  height:'100px',
       	  background:'red',
       },
       real:true,
       times:{
       	   enter:7000,
       	   leave:2000
       }
	},
	methods:{
		toggle(){
			this.real = !this.real;
		},
		beforeEnter(el,done){

         console.log(el);
		},
		use(){
			setInterval(function(){
				a+=1;
				 console.log(a)
			},100)
		},
		use1(){
			this.use(); //可以访问上一级的函数
		}
	},
	 created:function(){
		//this.use1();
	}



}).$mount('#test');






    1.全局组件： 创建的组件名必须是小写的字母  组件名有杠 要加'-'
        vue.component('tagname',{template:'<html>'})
        数据data必须是一个函数 并且返回一个对象（json）
        组件的方法写在组件里
     2.局部组件：  放在vue实例中  data同上放在对象里
        components:{
           tagname:Vueobj
        }
    3.模版语法：for循环可以出数据但是会报错 最终会渲染到定义的组件标签中,实例中绑定数据***无效
     <script type='text/x-template' id="hellWovue">
     
        <ul>
           <h1>hhhh</h1>
        <li v-for='value in arrs'>{{value}}</li>
        </ul>
      /script> 
      或者： <template id="name"></template> 
     components:{
        'mytagname':{
           template:'#name',
           data......
        }
     }
    4.动态组件：
        <component :is='data'></component>  data为组件的name/tagname

    5.https://github.com/vuejs/vue-devtools  vue的调试工具

    6.父子组件以及数据的传递;   :mymsg = 'someinfo'可以传入普通字符串  my-message ='myMessage' 注意命名规则{{myMseg}}  
    props可以绑定表单的val  v-model='myMsg'  
         在父组件<tagname> <newTagName>//子组件</newTagName> </tagname>
          componets:{
             name1:{
                 template:'<parent>我是父组件{{msg}}</parent> <child :m='msg'></child>',
                 data(){
                    retrun {
                        msg:'some Vue'
                    }
                 },
                 components:{
                    props:['m','',...] //{ 'm':string }
                    'name2':{ 
                       template:"<h1>我是子组件{{m}}</h1>"  //注意这里的m是props里的
                    }
                 }
             }
          }
     父级拿到子集的数据： 子集 vm/this.$emit('事件名','数据');  
      首先模版：


         <div id='box'>实例
            <aaa></aaa>父级

         <div>

        <template>父级
           <bbb @chiild-msg='get'></bbb>  子集_点击事件会触发这里
        </template> 
          <template>
            this.$emit(event,arg...)；
          </template>  子集
      父级绑定： v-on:事件名：方法 
  
     slot: 站位，应用组件中无法显示的标签，（模版覆盖自定义的那个组件内部的标签）
           当为空时，只当普通的标签输出，不为空时，显示标签内容，（slot内部不显示）
           ta放在模版中使用,多一个slot就是多一个内部的内容
           规划它们： 在slot name='ul-slot'  然后对应的ul  slot='ul-slot'

  */
var copms = Vue.extend({
    // template:'<h3>我是vue{{msg1}}</h3>',
     template:'#hellWovue',
     data(){
       return {
            msg1:'局部组件',
            arrs:['vue','js']
       }
     }
})

Vue.component('myh3',{
   template:'<h3>我是vue{{msg}}</h3>',
   data(){
      return {
          msg:'组件'
      }
   },
   methods:{
       //方法.....
   }
});

var app = new Vue({
	data:{
     views:{
        color:'red'
     },
     cop:'cop1'
	},
  components:{
    // inh3:copms  // {template.......}
     inh3:copms,
     'cop1':{
        template:'#aaa',
        data(){
           return {
               msg:'vue2.0'
           }
        },
        methods:{
            get(msg){
             //  alert(1);
               this.msg = msg;
            }
        },
        components:{
            'bbb':{
                template:'#ccc',
                data(){
                   return{
                       msg:'我是子集'
                   }
                 },
                methods:{
                    send(){
                      //  alert(this.msg);
                        this.$emit('child-msg',this.msg);
                    }
                },
                
            }
        }
     },
     'cop2':{
        template:"<span>您你你你</span>"
     }
  }



}).$mount('#test');




     路由： 
       起步：
        首先要用组件： <router-link to='/路径'></router-link>
        渲染到：
        <router-view></router-view> 
          
          js：首先定义每个路径要渲染的模版
          截止定义路由：
            routes = [
                  {path:'/...',components://},
                  {path:'/...',components://}
             ]
           router实例：
            router = new VueRouter({
                 routes
            })
            注册实例：
             const app = new Vue({
              router
             })
        获取路由中 输入的值：
        {$route.params.id} 模版中
        path:'/name/:id',  在浏览器地址/name/后边随便敲什么 模版都会渲染出那个值
      嵌套路由：
           name/home
           至于要在第一个路由中添加一个参数children:[path,copmpnent]
      标记路由：
         路由中多传入一个参数：name
      <router-link :to='{name:"user",params: { id: 123 }}'>hhhh</router-link>

  */

 const news = {
    template:'<h1>newssss{{$route.params.id}}  <router-view></router-view> </h1>'
 }   
  const home = {
    template:'<h1>HEllo Vue Router</h1>'
 }


 const routes = [
        {path:'/news/:id',component:news,
        name:'user',
           children:[
              {
                 path:'/home',
                 component:home
              }
         //     {},
            //  {}
            //  ......子集路由
           ]
      }
      //   {path:'/home',component:home}
   ]
 const router = new VueRouter({
      routes
 });

const app = new Vue({
    router
}).$mount('#box');





```



### 始终坚信
敢于尝试的你 其实已经进步了
