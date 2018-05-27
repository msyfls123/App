function first(input) {
  return input.split('\n') // to array
              .filter(data => !!data) // exclude empty line
              .map(l => l.split(/\s/)) // split by whitespace
              .map((l) => l.length === (new Set(l)).size) // test in Set
              .filter(e => !!e) // filter true
              .length // return length
}

function second(input) {
  return input.split('\n') // to array
              .filter(data => !!data) // exclude empty line
              .map(l => l.split(/\s/) // split by whitespace
                         .map(d => d.split('').sort().join('')) // rearrange letters
              )
              .map((l) => l.length === (new Set(l)).size) // test in Set
              .filter(e => !!e) // filter true
              .length // return length
}

function resolve() {
  var fs = require('fs')
  var input = fs.readFileSync('./4.txt', { encoding: 'utf-8' })
  var result1 = first(input)
  var result2 = second(input)
  console.log('Result 1: ' + result1, '\nResult 2: ' + result2)
}

module.exports = { first, second, resolve }
