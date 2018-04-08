## style操作

```js 
element.setAttribute('style','')

element.style.backgroundColor = 'red'

element.style.cssText //用来读写或删除整个style属性

element.style.setProperty(propertyName,value)  //设置css属性
element.style.getPropertyValue(property)  //获取css属性
element.style.removeProperty(property)  //删除css属性
操作非内联样式
//ie8
element.currentStyle[attrName]
//ie9+
window.getComputedStyle(el,null)[attrName] 
window.getComputedStyle(el,null).getPropertyValue(attrName)
//伪类
window.getComputedStyle(el,':after')[attrName]

```
