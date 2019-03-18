'use strict'

// Node Dependency
require('dotenv').config()
const express = require('express')
const parser = require('body-parser')

// Build HTTP Server
const app = express();
const appName = "Day Today"
//PORT
const PORT = process.env.PORT || 3000;

// Set the view engine
app.set('view engine', 'ejs')
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())

// Routes
app.get('/', home)
app.post('/guest/add', save)
app.get('/*', errorFunction)

// GET route rendering functions
function home (req, res) {
 res.render('index', {
   topicHead: `${appName}`
 })
 console.log('user has reached homepage')
}

// POST route rendering functions
function save (req, res) {
  let guest = {
    first: req.body.fname,
    last: req.body.lname
  }
  console.log(guest)
  res.render('index', {
    userValue: guest,
    topicHead: 'Walk-In Visitor'
  })
}

function errorFunction (req, res) {
  res.status(404).send('404 error')
}

// Event Listener Functions


app.listen(PORT, () => console.log(`app is listening on PORT ${PORT}`)
)