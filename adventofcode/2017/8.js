// https://adventofcode.com/2017/day/8

const fs = require('fs')
const path = require('path')

const registers = {}

function compare(a, comparator, b) {
  switch (comparator) {
    case '>':
      return a > b
    case '<':
      return a < b
    case '==':
      return a == b
    case '<=':
      return a <= b
    case '>=':
      return a >= b
    case '!=':
      return a != b
    default:
      return false
  }
}

function process(reg, [key, op, num, _if, keyA, comparator, valueB]) {
  const compareResult = compare(
    +reg[keyA] || 0,
    comparator,
    +valueB || 0
  )
  if (compareResult) {
    reg[key] = (+reg[key] || 0) + (op === 'inc' ? +num : -num)
  }
  return reg
}

function parseLines(input) {
  const raw = input.split('\n').filter(v => v)
  return raw.map((p) => p.split(/\s/))
}

function resolve() {
  const input = fs.readFileSync(path.resolve(__dirname, '8.txt'), { encoding: 'utf-8'})
  const intructions = parseLines(input)
  const afterRegisters = intructions.reduce(process, registers)
  return Math.max(...Object.values(afterRegisters))
}
console.log(resolve())

module.exports = { resolve }