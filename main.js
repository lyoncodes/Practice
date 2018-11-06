'use strict'
console.log('mainJs is loaded')
var paper
paper.install(window) // Installs paper as global variable
paper.setup(document.getElementById('mainCanvas')) // attaches paper to canvas
// TODO
paper.view.draw()
