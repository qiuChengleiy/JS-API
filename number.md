## Number对象

* 生成对象

```js
var n = new Number();
```

* Number对象的属性

```js
Number.POSITIVE_INFINITY：正的无限，指向Infinity。  
Number.NEGATIVE_INFINITY：负的无限，指向-Infinity。  
Number.NaN：表示非数值，指向NaN。  
Number.MAX_VALUE：表示最大的正数，相应的，最小的负数为-Number.MAX_VALUE。  
Number.MIN_VALUE：表示最小的正数（即最接近0的正数，在64位浮点数体系中为5e-324），相应的，最接近0的负数为-Number.MIN_VALUE。  
Number.MAX_SAFE_INTEGER：表示能够精确表示的最大整数，即9007199254740991。  
Number.MIN_SAFE_INTEGER：表示能够精确表示的最小整数，即-9007199254740991。

```

* Number对象实例的方法

```js
toString()   //用来将一个数值转为字符串形式.可以接受一个参数，表示输出的进制。如果省略这个参数，默认将数值先转为十进制，再输出字符串；否则，就根据参数指定的进制，将一个数字转化成某个进制的字符串。
toFixed()   //用于将一个数转为指定位数的小数，返回这个小数对应的字符串。
toExponential()  //用于将一个数转为科学计数法形式。可传入一个参数，参数表示小数点后有效数字的位数，范围为0到20，超出这个范围，会抛出一个RangeError。
toPrecision()  //用于将一个数转为指定位数的有效数字。
```

