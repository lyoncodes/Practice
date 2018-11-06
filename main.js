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
var hand = []

// Two helper functions
function rand (m, n) {
  return m + Math.floor((n - m + 1) * Math.random())
}
function randFace () {
  return ['crown', 'anchor', 'heart', 'spade', 'club', 'diamond'][rand(0, 5)]
}
while (funds > 1 && funds < 100) {
  const bets = { crown: 0, anchor: 0, heart: 0, spade: 0, club: 0, diamond: 0 }
  let totalBet = rand(1, funds)
  if (totalBet === 7) {
    totalBet = funds
    bets.heart = totalBet
  } else {
    // distribute total bet
  }
  funds = funds - totalBet
  // place bets
  // roll dice
  // take winnigs
}

