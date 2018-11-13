'use strict'
$(function () {
  $('#mainTitle').html("Michael's Math")
})
$(function () {
  $('#greeting').after('Michael')
})
$(function () {
  $('#problemBox').text('5x + 7 > 3(x + 1)')
})
$(function () {
  var title = $('<h1></h1>').text('Greetings!')
  var subtitle = $('<h3></h3>').text('Here is what I\'ve been up to these days')
  $('#heading').before(title, subtitle)
})

$(function () {
  $('button').click(function () {
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

$(function () {
  $("#add").on("click", function () {
    var val = $("input").val()
    if (val !== '') {
      var elem = $("<li></li>").text(val)
      $(elem).append("<button class = 'remove'>X</button>")
      $("#mylist").append(elem)
      $("input").val("")
    }
  })
})
// var problemBox = document.getElementById('problemBox')
// problemBox.textContent = '5x + 7 > 3(x + 1)'
