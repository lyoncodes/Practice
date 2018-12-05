'use strict'
$(function () {
  // Grab the template script
  var theTemplateScript = $('#personal-greeting').html()
  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript)
  // Define our data object
  var context = {
    'name': 'michael',
    'home': 'oregon'
  }
  // Pass data to template
  var theCompiledHtml = theTemplate(context)
  // Add to page
  $('.content-placeholder').html(theCompiledHtml)
})
// $(function () {
//   Handlebars.registerHelper('capitalize', function (str) {
//     str = str || ''
//     return str.slice(0, 1).toUpperCase() + str.slice(1)
//   })
//   var theTemplateString = $('#built-in-helpers-template').html()
//   var theTemplate = Handlebars.compile(theTemplateString)

// })

$(function () {
  Handlebars.registerHelper('capitalize', (arr) => {
    arr = arr || []
    return arr[0].slice(0, 1).toUpperCase()
  })
})
