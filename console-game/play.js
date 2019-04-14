const { Game } = require('./src/Game')
const { userInterface } = require('./src/userInterface')
const game = new Game(new userInterface())

// Start the show
game.start();