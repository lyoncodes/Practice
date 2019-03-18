'use strict'

// Node Dependency
const express = require('express')
const pg = require('pg')
const superagent = require('superagent')
const methodOverride = require('method-override')
const parser = require('body-parser')

require('dotenv').config()

// Build HTTP Server
const app = express();
const appName = "Day Today"

//PORT
const PORT = process.env.PORT || 3000;

// Database Setup
const client = new pg.Client(process.env.DATABASE_URL)
client.connect()
client.on('error', err => console.log(err))

// Set the view engine
app.set('view engine', 'ejs')
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())

// Routes
app.get('/', home)
app.get('/', save)
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
    last: req.body.lname,
    fplan: req.body.fplan,
    moveIn: req.body.moveIn,
    price: req.body.price
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