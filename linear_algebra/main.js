'use strict'
$(document).ready(function () {
  // jQuery goes here
})
// RIGHT
$(function () {
  var darkMatter = $('<div></div>').height(100)
  $('#left').css({float: 'left', width: '50%', height: '100%', 'background-color': '#d9ffcc'})
  $('#mainTitle').html('Michael Lyon')
  $('#mainTitle').css({'text-align': 'center'})
  $('#mainTitle').before(darkMatter)
})
// LEFT
$(function () {
  var darkMatter = $('<div></div>').height(200)
  $('#right').css({float: 'left', width: '50%', height: '100%', 'background-color': '#ffffcc'})
  $('.links').before(darkMatter)
  $('.links a').css({float: 'left', width: '33%', margin: '12px 33.33%', padding: '15px', border: '1px solid #d9ffcc', 'text-align': 'center'})
})

// factorial function
// a factorial is represented in math with the '!' sign. It is the product of a number times all the numbers beneath it. Thus, (4!) = 24, because 4 * 3 * 2 * 1 = 24.
function factorial (number) {
  if (number === 1) {
    return number
  } else {
    return number * factorial(number - 1)
  }
}
console.log(factorial(20))
// two dimensional array
Array.matrix = function (numrows, numcols, initializer) {
  var arr = []
  for (var i = 0; i < numrows; i++) {
    var columns = []
    for (var j = 0; j < numcols; j++) {
      columns[j] = initializer
    }
    arr[i] = columns
  }
  return arr
}

