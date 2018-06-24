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


