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
app.use(express.static('./public'))
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
}

// POST route rendering functions

// Let's think about opening up a fresh route for db hits, instead of banging our heads against the syntax of ejs and other frameworks. Let's get it working along clear routes and then refactor for single page POST'ing

// new button
// button action to new route
// function callback renders new page with formatted objects

function save (req, res) {
  // create an object with the req.body (form data)
  let guest = {
    first: req.body.fname,
    last: req.body.lname,
    fplan: req.body.fplan,
    moveIn: req.body.moveIn,
    price: req.body.price
  }
  console.log(guest)
    res.render('index', {
      topicHead: `${appName}`,
      userValue: guest,
    })
}

// Objects
function Guest (obj) {
  this.first = obj.body.fname,
  this.last = obj.body.lname,
  this.fplan = obj.body.fplan,
  this.moveIn = obj.body.moveIn,
  this.price = obj.body.price
}
function errorFunction (req, res) {
  res.status(404).send('404 error')
}

// Event Listener Functions


app.listen(PORT, () => console.log(`app is listening on PORT ${PORT}`)
)