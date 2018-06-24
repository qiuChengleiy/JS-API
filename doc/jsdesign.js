
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

