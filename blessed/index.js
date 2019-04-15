'use strict';
const blessed = require('blessed')

// Create screen object
const screen = blessed.screen({
 smartCSR: true
});

screen.title = 'FORM'

const form = blessed.form({
  parent: screen,
  keys: true,
  left: 0,
  top: 0,
  width: 30,
  height: 4,
  bg: 'green',
  content: 'Submit or cancel?'
});

const submit = blessed.button({
  parent: form,
  mouse: true,
  keys: true,
  shrink: true,
  padding: {
    left: 1,
    right: 1
  },
  left: 10,
  top: 2,
  shrink: true,
  name: 'submit',
  content: 'submit',
  style: {
    bg: 'blue',
    focus: {
      bg: 'red'
    },
    hover: {
      bg: 'red'
    }
  }
});

var cancel = blessed.button ({
  parent: form,
  mouse: true,
  keys: true,
  shrink: true,
  padding: {
    left: 1,
    right: 1
  },
  left: 20,
  top: 2,
  shrink: true,
  name: 'cancel',
  content: 'cancel',
  style: {
    bg: 'blue',
    focus: {
      bg: 'red'
    },
    hover: {
      bg: 'red'
    }
  }
});

submit.on('press', () => {
  form.submit();
});

cancel.on('press', () => {
  form.setContent('Submitted');
  screen.render();
});

form.on('submit', data => {
  form.setContent('submitted');
  screen.render();
})

form.on('reset', data => {
  form.setContent('canceled');
  screen.render();
})
// Exit Function

screen.key('q', () => {
  process.exit(0);
});

screen.render();