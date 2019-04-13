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
  if ((key.name === 'down' || key.name === 's') && this.currentDirection !== 'up') {
   this.currentDirection = 'down'
  }
  if ((key.name === 'left' || key.name === 'a') && this.currentDirection !== 'right') {
   this.currentDirection = 'left'
  }
  if ((key.name === 'right' || key.name === 'd') && this.currentDirection !== 'left') {
   this.currentDirection = 'right'
  }
 }

 moveSnake() {
  // move the head forward one pixel based on velocity
  const head = {
   x: this.snake[0].x + DIRECTIONS[this.currentDirection].x,
   y: this.snake[0].y + DIRECTIONS[this.currentDirection].y,
  }
  this.snake.unshift(head)
  
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