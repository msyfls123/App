// http://adventofcode.com/2017/day/6

function switchNumber(_arr){
  const arr = _arr.slice()
  let max = arr.reduce((acc, v) => acc > v ? acc : v, 0)
  let maxIndex = arr.findIndex((v) => v === max)
  arr[maxIndex] = 0
  const len = arr.length
  for (var total = max, index = (maxIndex + 1) % len; total > 0;) {
     arr[index] += 1
     index = (index + 1) % len
     total -= 1
  }
  return arr
}

function campareArr(arr1, arr2) {
  return arr1.every((v, i) => v === arr2[i])
}
function checkArr(arrList, arr) {
  return arrList.every((a) => !campareArr(a, arr))
}

function resolve() {
  const list = [0, 5, 10, 0, 11, 14, 13, 4, 11, 8, 8, 7, 1, 4, 12, 11]
  let tmpList = list.slice(), store = [], count = 0
  while(checkArr(store, tmpList)) {
    store.push(tmpList)
    tmpList = switchNumber(tmpList)
    count += 1
  }
  const firstMet = store.findIndex((l) => campareArr(l, tmpList))
  // last fount tmpList has not been added to store
  const metDiff = store.length - firstMet
  console.log(count, metDiff)
  return [count, metDiff]
}

module.exports = { resolve }