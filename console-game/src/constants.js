'use strict'
const GAME_SPEED = 50
const DIRECTIONS = {
 up: { x: 0, y: -1 },
 down: { x: 0, y: 1 },
 right: { x: 1, y: 0 },
 left: { x: -1, y: 0 },
}
const INITIAL_SNAKE_SIZE = 4
const SNAKE_COLOR = 'white'
const DOT_COLOR = 'green'

module.exports = {
 GAME_SPEED,
 DIRECTIONS,
 INITIAL_SNAKE_SIZE,
 SNAKE_COLOR,
 DOT_COLOR
}