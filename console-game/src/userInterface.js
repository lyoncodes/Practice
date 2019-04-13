const blessed = require('blessed')
// Terminal API library that provides screen and elements

class UserInterface {
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
}