// 服务端

// const getNum = (value) => {
//   if(value === 0) {
//     return 1
//   }else {
//     return value * 2
//   }
// }


// module.exports = getNum;



//客户端

// window.createDiv = function(value) {
//   var oDiv = document.createElement('div')
//   oDiv.id = 'myDiv'
//   oDiv.innerHTML = value
//   document.body.appendChild(oDiv)
// }



//es6
const createDiv = value => {
  var oDiv = document.createElement('div')
  oDiv.id = 'myDiv'
  oDiv.innerHTML = value
  document.body.appendChild(oDiv)
}

module.exports = createDiv





