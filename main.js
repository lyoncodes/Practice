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
// The Game

// Two helper functions
function rand (m, n) {
  return m + Math.floor((n - m + 1) * Math.random())
}
function randFace () {
  return ['crown', 'anchor', 'heart', 'spade', 'club', 'diamond'][rand(0, 5)]
}

// global variables
var funds = 50
var round = 0
// place bets
while (funds > 1 && funds < 100) {
  round++
  console.log(`round ${round}:`)
  console.log(`\tstarting funds: ${funds}p`)
  const bets = { crown: 0, anchor: 0, heart: 0, spade: 0, club: 0, diamond: 0 }
  let totalBet = rand(1, funds)
  if (totalBet === 7) {
    totalBet = funds
    bets.heart = totalBet
  } else {
    // distribute bets
    let remaining = totalBet
    do {
      let bet = rand(1, remaining)
      let face = randFace()
      bets[face] = bets[face] + bet
      remaining = remaining - bet
    } while (remaining > 0)
  }
  funds = funds = totalBet
  console.log('\tbets: ' +
    Object.keys(bets).map(face => `${face}: ${bets[face]} pence`).join(', ') + ` (total: ${totalBet} pence)`)

  // roll dice x3
  const hand = []
  for (let i = 0; i < 3; i++) {
    hand.push(randFace())
  }
  console.log(`\thand: ${hand.join(', ')}`)

  // take winnings
  let winnings = 0
  for (let j = 0; j < hand.length; j++) {
    let face = hand[j]
    if (bets[face] > 0) winnings = winnings + bets[face]
  }
  funds = funds + winnings
  console.log(`\twinnings: ${winnings}`)
}
