'use strict'
const {
 GAME_SPEED,
 DIRECTIONS,
 INITIAL_SNAKE_SIZE,
 SNAKE_COLOR,
 DOT_COLOR,
} = require('./constants.js')

class Game {
 constructor(ui) {
  this.ui = ui

  //Bind handlers to UI so we can detect input change from the Game class
  this.ui.bindHandlers(
   this.changeDirection.bind(this),
   this.quit.bind(this),
   this.start.bind(this)
  )
 }

 reset() {
  // initial game state
  this.snake = []

  for (let i = INITIAL_SNAKE_SIZE; i >= 0; i--) {
   this.snake[INITIAL_SNAKE_SIZE - i] = { x: i, y: 0 }
  }

  this.dot = {}
  this.score = 0
  this.currentDirection = 'right'
  this.timer = null

  // Generate initial dot
  this.generateDot()
  this.ui.resetScore()
  this.ui.render()
 }

 // changeDirection function
 changeDirection(_, key) {
  if ((key.name === 'up' || key.name === 'w') && this.currentDirection !== 'down') {
   this.currentDirection = 'up'
  }
 }
 start() {
  if (!this.timer) {
   this.reset()

   this.timer = setInterval(this.tick.bind(this), GAME_SPEED)
  }
 }
 quit() {
  process.exit(0)
 }

}
module.exports = { Game };