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
