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