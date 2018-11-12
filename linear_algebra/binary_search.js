'use strict'
function binarySearch (array, key) {
  let start = 0
  let end = array.length - 1
  while (start <= end) {
    const midPoint = start + Math.floor((end - start) / 2)
    if (array[midPoint] === key) {
      return midPoint
    }
    if (array[midPoint] < key) {
      start = midPoint + 1
    } else {
      end = midPoint - 1
    }
  }
  return -1
}
var test = [1, 2, 3, 4, 5, 7, 6, 8, 9, 10]
console.log(binarySearch(test, 9))
console.log('this is binary')
