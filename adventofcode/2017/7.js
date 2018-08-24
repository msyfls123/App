// http://adventofcode.com/2017/day/7

const fs = require('fs')
const path = require('path')

function parseNodes(input) {
  const raw = input.split('\n').filter(v => v)
  const treeNodes = raw.map((p) => {
    const arr = Array.from(p.match(/[a-z0-9]+/g))
    const [name, count, ...rest] = arr
    return { name, nodes: rest, count: +count }
  })
  return treeNodes
}

function first(treeNodes) {
  // baseNode -> childrenNodes
  // connectNode -> childrenNodes && self as childrenNodes
  // leafNodes -> no childrenNodes
  // so, baseNode = all nodes - all unique childrenNodes - all leafNodes

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
  return baseNode
}

function findNode(nodes, name) {
  return nodes.find(n => n.name === name)
}

Array.prototype.sum = function() {
  return this.reduce((acc, v) => acc + v, 0)
}

function sumNode(name, nodes) {
  const node = findNode(nodes, name)
  if (node.totalCount) {
    return node.totalCount
  }
  if (node.nodes.length) {
    node.totalCount = node.nodes.map(nodeName => sumNode(nodeName, nodes)).sum() + node.count
    return node.totalCount
  } else {
    node.totalCount = node.count
    return node.count
  }
}

function isMeGuilty(name, nodes) {
  // assume you arrive here with sin
  const node = findNode(nodes, name)
  if (node.nodes.length === 0) {
    return true
  } else {
    const childrenCountList = node.nodes.map(nodeName => sumNode(nodeName, nodes))
    const childrenCountAvg = childrenCountList.sum() / childrenCountList.length
    return childrenCountList.every((count) => count === childrenCountAvg)
  }
}

function findErrorNodeInfoInChildren(name, nodes) {
  const node = findNode(nodes, name)
  const childrenCountList = node.nodes.map(nodeName => sumNode(nodeName, nodes))
  const blackSheep = childrenCountList.find((v, i, self) => !self.some((v2, i2) => i === i2 ? false : v2 === v))
  const commonSheep = childrenCountList.find((v) => v !== blackSheep)
  const blackSheepName = node.nodes[childrenCountList.findIndex((v) => v === blackSheep)]
  return {
    nodeName: blackSheepName,
    diff: blackSheep - commonSheep,
    node: findNode(nodes, blackSheepName)
  }
}

function findGuilty(name, nodes) {
  const node = findNode(nodes, name)
  if (isMeGuilty(name, nodes)) {
    return node
  } else {
    const errorChildNodeName = findErrorNodeInfoInChildren(name, nodes).nodeName
    return findGuilty(errorChildNodeName, nodes)
  }
}

function second(treeNodes, base) {
  const guiltyNode = findGuilty(base.name, treeNodes)
  const parent = treeNodes.find((node) => node.nodes.includes(guiltyNode.name))
  const errorNodeInfo = findErrorNodeInfoInChildren(parent.name, treeNodes)
  return errorNodeInfo.node.count - errorNodeInfo.diff
}


function resolve() {
  const input = fs.readFileSync(path.resolve(__dirname, '7.txt'), { encoding: 'utf-8' })
  const treeNodes = parseNodes(input)
  const firstResult = first(treeNodes)
  const baseNode = firstResult
  const secondResult = second(treeNodes, baseNode)
  return [firstResult, secondResult]
}

module.exports = { resolve }
