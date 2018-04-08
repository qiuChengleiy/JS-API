# CSS操作

### 类名操作

```js
//ie8以下
Element.className  //获取元素节点的类名
Element.className += ' ' + newClassName  //新增一个类名

//判断是否有某个类名
function hasClass(element,className){
  return new RegExp(className,'gi').test(element.className);
}

//移除class
function removeClass(element,className){
  element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'),'');
}

//ie10 
element.classList.add(className)  //新增
element.classList.remove(className)  //删除
element.classList.contains(className)  //是否包含
element.classList.toggle(className)  //toggle class
```


