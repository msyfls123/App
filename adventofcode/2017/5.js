function walk(input) {
  let step = 0, count = 0
  const raw = input.slice()
  while (step >= 0 && step < raw.length) {
    const stepLength = raw[step]
    count += 1
    raw[step] += 1
    step = step + stepLength
  }

  return count
}

function walkStranger(input) {
  let step = 0, count = 0
  const raw = input.slice()
  while (step >= 0 && step < raw.length) {
    const stepLength = raw[step]
    count += 1
    raw[step] += raw[step] >= 3 ? -1 : 1
    step = step + stepLength
  }

  return count
}

function resolve(path = './5.txt') {
  const fs = require('fs')
  const input = fs
    .readFileSync(path, { encoding: 'utf-8' })
    .split('\n')
    .map(k => k.trim())
    .filter(e => e.length)
    .map(k => parseInt(k, 10))
  return [walk(input), walkStranger(input)]
}

module.exports = { resolve }
