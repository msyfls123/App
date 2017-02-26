console.log('Ok')
console.log(NODE_ENV)

require('css/index.styl')

document.querySelector('#box').addEventListener('click', function(e){
  console.log('click')
  document.querySelector('#box1').emit('focus')
})
