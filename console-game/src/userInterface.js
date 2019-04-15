'use strict'
// Terminal API library that provides screen and elements
const blessed = require('blessed')

class userInterface {
  constructor() {
   this.blessed = blessed
   this.screen = blessed.screen()

   this.screen.title = 'Loading Snake'
   
   this.gameBox = this.createGameBox()
   this.scoreBox = this.createScoreBox()
   this.gameOverBox = this.createGameOverBox()

   this.gameContainer = this.blessed.box(this.gameBox)
   this.scoreContainer = this.blessed.box(this.scoreBox)
  }
 //functions
  createGameBox() {
   return {
    parent: this.screen,
    top: 1,
    left: 0,
    width: '100%',
    height: '100%-1',
    style: {
     fg: 'black',
     bg: 'black',
    },
   }
  }

  createScoreBox() {
   return {
    parent: this.screen,
    top: 0,
    left: 'left',
    width: '100%',
    height: 1,
    tags: true,
    style: {
     fg: 'black',
     bg: 'white',
    },
  }
 }

  createGameOverBox() {
   return {
    parent: this.screen,
    top: 'center',
    left: 'center',
    width: 20,
    height: 6,
    tags: true,
    valign: 'middle',
    content: `{center}YOU DIED\n\nPRESS ENTER{/center}`,
    border: {
      type: 'line',
   },
    style: {
     fg: 'black',
     bg: 'magenta',
    border: {
      fg: '#ffffff',
    },
   },
  }
}
  bindHandlers(keyPressHandler, quitHandler, enterHandler) {
   // keypress events
   this.screen.on('keypress', keyPressHandler)
   this.screen.key(['escape', 'q', 'C-c'], quitHandler)
   this.screen.key(['enter'], enterHandler)
  }

  draw(coord, color) {
   this.blessed.box({
     parent: this.gameContainer,
     top: coord.y,
     left: coord.x,
     width: 1,
     height: 1,
     style: {
       fg: color,
       bg: color,
     },
   })
  }

  // Score keeping
  updateScore(score) {
   // blessed element setLine()
    this.scoreContainer.setLine(0, `{bold}Score:{/bold} ${score}`)
  }
  gameOverScreen() {
   this.gameContainer = this.blessed.box(this.gameOverBox)
  }

  clearScreen() {
   this.gameContainer.detach()
   this.gameContainer = this.blessed.box(this.gameBox)
  }

  // Reset Score
  resetScore() {
   this.scoreContainer.detach()
   this.scoreContainer = this.blessed.box(this.scoreBox)
   this.updateScore(0)
  }

 render() {
  this.screen.render()
 }
}
module.exports = { userInterface }