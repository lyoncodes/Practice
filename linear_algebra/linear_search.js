'use strict'
function linearSearch (array, key) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === key) {
      return i
    }
  }
  return -1
}
var test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(linearSearch(test, 8))
console.log('this is linear')
