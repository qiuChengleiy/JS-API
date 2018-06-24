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