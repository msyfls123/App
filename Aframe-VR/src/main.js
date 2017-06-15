console.log('OK')
console.log(NODE_ENV)

require('css/index.styl')

  document.querySelector('#box').addEventListener('click', function(e){
    console.log('click')
      document.querySelector('#box1').emit('focus')
  })

function debounce(tick, action) {
  var last = null
    return function() {
      var ctx = this, args = arguments
        clearTimeout(last)
        last = setTimeout(function() {
          action.apply(ctx, args)
        }, tick)
    }
}

var throttle = function(delay, action){
  var last = 0
    return function(){
    var curr = +new Date()
      if (curr - last > delay){
        action.apply(this, arguments)
          last = curr 
      }
  }
}

var cursor = document.querySelector('#camera a-camera'),
    scene = document.querySelector('a-scene'),
    globalTime = 0

function showRotation(delay) {
  var time = scene.time
  if (time >= globalTime + delay) {
    globalTime = time
    console.log(cursor.getAttribute('rotation'))
  }
}

AFRAME.registerComponent('cursor-rotation', {
  tick: function (time, timeDelta) {
    showRotation(1000)
  }
})
