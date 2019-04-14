'use strict';
const blessed = require('blessed')

// Create screen object
const screen = blessed.screen({
 smartCSR: true
});

screen.title = 'DARK SOULS III'

// Layout

const box = blessed.box({
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: '{bold}DARK SOULS III{bold}',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'red',
    border: {
     fg: '#f0f0f0'
    },
    hover: {
     bg: 'white'
    }
  }
});

// Append box to screen
screen.append(box);

screen.render();