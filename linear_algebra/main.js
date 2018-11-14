'use strict'
// Some JQUERY drills
$(document).ready(function () {
  // jQuery goes here
})

$(function() {
  $("#mainTitle").html("Welcome to Michael's Math")
})
$(function () {
  $('#greeting').after("Young Hobbit Lyon")
  $('#greeting').click(function () {
    $('#greeting').toggleClass("headline")
    $('#greeting').animate({
      paddingLeft: '250px',
      height: '250px'
    }, 1000)
  })
})

$(function () {
  $('#problemBox').text('5x + 7 > 3(x + 1)')
})

$(function () {
  var title = $('<h1></h1>').text('Greetings!')
  var subtitle = $('<h3></h3>').text('Here is what I\'ve been up to these days')
  $('#heading').before(title, subtitle)
  $('#mainTitle').addClass("headline")
  $('#mainTitle').css('background-color', 'lightyellow')
})

$(function () {
  $('button').click(function () {
    $('#problemBox').slideToggle(500)
    $('#problemBox').toggleClass('problemBoxToggle')
  })
  $('#problemBox').css({'margin': '50px auto'})
  $('button').css({'margin': '25px'})
})

$(function () {
  $("#binary").click((e) => {
    alert(e.pageX)
    e.preventDefault()
  })
})

$('#item').click(function() {
  $('#submenu').slideToggle(500)
})
// Here's a handy pair of functions that calculate rates and discounts. This is from the CodeWars KATA titled, "Transportation on Vacation."


