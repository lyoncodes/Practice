'use strict'
$(document).ready(function () {
  // jQuery goes here
})

$(function () {
  var darkMatter = $('<div></div>').height(100)
  $('#left').css({float: 'left', width: '50%', height: '100%'})
  $('#mainTitle').html('Michael Lyon')
  $('#mainTitle').css({marginLeft: '125px', float: 'left'})
  $('#mainTitle').before(darkMatter)
})
$(function () {
  var darkMatter = $('<div></div>').height(200)
  $('#right').css({float: 'right', width: '50%'})
  $('.links').before(darkMatter)
  $('.links a').css({margin: 'auto 250px', display: 'block'})
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
