'use strict'
console.log('mainJs is loaded')

// paper js
var paper
paper.install(window)
paper.setup(document.getElementById('mainCanvas'))

var mainCanvas = document.getElementById('mainCanvas')
mainCanvas.style.margin = '100px 250px'

// Heading
var clickTool = new Tool()

var c = Shape.Circle(160, 150, 80)
c.fillColor = 'black'

var text = new PointText(160, 160)
text.justification = 'center'
text.fillColor = 'white'
text.fontSize = 20
text.content = 'Pirate Game'

clickTool.onMouseDown = (e) => {
  var c = Shape.Circle(e.point.x, e.point.y, 20)
  c.fillColor = 'black'
}

paper.view.draw()

// global variables
var funds = 50
var bets = {}
var hand = []

// while (funds > 1 && funds < 100) {
//   // place bets
//   // roll dice
//   // take winnigs
// }
// Two helper functions
function rand (m, n) {
  return m + Math.floor((n - m + 1) * Math.random())
}
function randFace () {
  return ['crown', 'anchor', 'heart', 'spade', 'club', 'diamond'][rand(0, 5)]
}
