## console对象

* 方法

```js
console.log(text,text2,...)   //用于在console窗口输出信息。它可以接受多个参数，将它们的结果连接起来输出。如果第一个参数是格式字符串（使用了格式占位符），console.log方法将依次用后面的参数替换占位符，然后再进行输出。
console.info()   //在console窗口输出信息，同时，会在输出信息的前面，加上一个蓝色图标。
console.debug()  //在console窗口输出信息，同时，会在输出信息的前面，加上一个蓝色图标。
console.warn()  //输出信息时，在最前面加一个黄色三角，表示警告；
console.error()  //输出信息时，在最前面加一个红色的叉，表示出错，同时会显示错误发生的堆栈
console.table()  //可以将复合类型的数据转为表格显示。
console.count()  //用于计数，输出它被调用了多少次。
console.dir()    //用来对一个对象进行检查（inspect），并以易于阅读和打印的格式显示。
console.dirxml()  //用于以目录树的形式，显示DOM节点。
console.assert()  //接受两个参数，第一个参数是表达式，第二个参数是字符串。只有当第一个参数为false，才会输出第二个参数，否则不会有任何结果。

//这两个方法用于计时，可以算出一个操作所花费的准确时间。
console.time()
console.timeEnd()
//time方法表示计时开始，timeEnd方法表示计时结束。它们的参数是计时器的名称。调用timeEnd方法之后，console窗口会显示“计时器名称: 所耗费的时间”。

console.profile()  //用来新建一个性能测试器（profile），它的参数是性能测试器的名字。
console.profileEnd()  //用来结束正在运行的性能测试器。

console.group()
console.groupend()
//上面这两个方法用于将显示的信息分组。它只在输出大量信息时有用，分在一组的信息，可以用鼠标折叠/展开。
console.groupCollapsed()  //用于将显示的信息分组，该组的内容，在第一次显示时是收起的（collapsed），而不是展开的。

console.trace()  //显示当前执行的代码在堆栈中的调用路径。
console.clear()  //用于清除当前控制台的所有输出，将光标回置到第一行。

```


