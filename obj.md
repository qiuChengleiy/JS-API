##  Object对象

* 生成实例对象

```js
var o = new Object();
```

* 属性

```js
Object.prototype   //返回原型对象
```

* 方法

```js
Object.keys(o)   //遍历对象的可枚举属性
Object.getOwnPropertyName(o)   //遍历对象不可枚举的属性

```

* 对象实例的方法

```js
valueOf()：返回当前对象对应的值。  
toString()：返回当前对象对应的字符串形式。  
toLocaleString()：返回当前对象对应的本地字符串形式。  
hasOwnProperty()：判断某个属性是否为当前对象自身的属性，还是继承自原型对象的属性。 
isPrototypeOf()：判断当前对象是否为另一个对象的原型。
propertyIsEnumerable()：判断某个属性是否可枚举。

```



