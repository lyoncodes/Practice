'use strict'
console.log('mainJs is loaded')
// paper js
var paper
paper.install(window)
paper.setup(document.getElementById('mainCanvas'))

var mainCanvas = document.getElementById('mainCanvas')
mainCanvas.style.margin = '100px 250px'

// TODO
var clickTool = new Tool()

var c = Shape.Circle(160, 160, 80)
c.fillColor = 'black'

var text = new PointText(160, 160)
text.justification = 'center'
text.fillColor = 'white'
text.fontSize = 20;
text.content = 'Pirate Game'

clickTool.onMouseDown = (e) => {
  var c = Shape.Circle(e.point.x, e.point.y, 20)
  c.fillColor = 'black'
}

paper.view.draw()
