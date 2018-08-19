// http://adventofcode.com/2017/day/7

const fs = require('fs')
const path = require('path')

function first(input) {
  // baseNode -> childrenNodes
  // connectNode -> childrenNodes && self as childrenNodes
  // leafNodes -> no childrenNodes
  // so, baseNode = all nodes - all unique childrenNodes - all leafNodes
  const raw = input.split('\n').filter(v => v)
  const treeNodes = raw.map((p) => {
    const arr = Array.from(p.match(/[a-z0-9]+/g))
    const [name, count, ...rest] = arr
    return { name, nodes: rest }
  })
  const leafNodes =
    treeNodes
    .filter(t => t.nodes.length === 0)
    .map(t => t.name)
  const connectNodes =
    treeNodes
    .reduce((acc, t) => acc.concat(t.nodes), [])
    .reduce((acc, v) => acc.includes(v) ? acc : acc.concat(v), [])
  const baseNode =
    treeNodes
      .find(({name}) => !leafNodes.includes(name) && !connectNodes.includes(name))
  return baseNode && baseNode.name
}


function resolve() {
  const input = fs.readFileSync(path.resolve(__dirname, '7.txt'), { encoding: 'utf-8' })
  const firstResult = first(input)
  console.log(firstResult)
  return firstResult
}

module.exports = { resolve }
