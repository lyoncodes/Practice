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

  this.reset()

  // Bind handlers to UI so we can detect input change from the Game class
  this.ui.bindHandlers(
   this.changeDirection.bind(this),
   this.quit.bind(this),
   this.start.bind(this)
  )
 }

 reset() {
  // initial game state
  this.snake = []

  // increment backwards to make default snake
  for (let i = INITIAL_SNAKE_SIZE; i >= 0; i--) {
   this.snake[INITIAL_SNAKE_SIZE - i] = { x: i, y: 0 }
  }

  this.dot = {}
  this.score = 0

  // Start the snake in the following direction & set timer to null
  this.currentDirection = 'right'
  this.timer = null

  // Generate initial dot
  this.generateDot()
  this.ui.resetScore()
  this.ui.render()

 }

 // changeDirection function w/ conditionals for double input
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
/**
 * create a new head by adding a new segment to array position 0, incrementing by 1 velocity. With each increment, remove one item from the end of the array to make the snake move. 
 * 
 * Unless of course the snake hits a dot! Then increase the score and increase the length of the snake by 1.
 */
 moveSnake() {
  // move the head forward one pixel based on velocity
  const head = {
   x: this.snake[0].x + DIRECTIONS[this.currentDirection].x,
   y: this.snake[0].y + DIRECTIONS[this.currentDirection].y,
  }
  this.snake.unshift(head)

  // Capture Dot Event -- Player Scores!
  if (this.snake[0].x === this.dot.x && this.snake[0].y === this.dot.y) {
   this.score ++
   this.ui.updateScore(this.score)
   this.generateDot()
  } else {
   this.snake.pop()
  }
 }

 generateRandomPixelCoord(min, max) {
  // Generate random coordinate from 0 - max container height & width
  return Math.round(Math.random() * (max-min) + min)
 }

 generateDot() {
    this.dot.x = this.generateRandomPixelCoord(0, this.ui.gameContainer.width-1)
    this.dot.y = this.generateRandomPixelCoord(1, this.ui.gameContainer.height-1)

    // What if the pixel ends up on the tail of the snake? We'll need to regenerate the dot in that event
    this.snake.forEach(segment => {
     if (segment.x === this.dot.x && segment.y === this.dot.y) {
      this.generateDot()
     }
    })
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