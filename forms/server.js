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
app.post('/guest/add', add)
app.post('/guest/saved', save)
app.get('/*', errorFunction)

// GET route rendering functions
function home (req, res) {
 res.render('index', {
   topicHead: `${appName}`
 })
}

// POST route rendering functions
function add (req, res) {
  let guest = new Guest(req.body)
    res.render('saved', {
      topicHead: `${appName}`,
      userValue: guest,
    })
}

function save (req, res) {
  let SQL = `INSERT INTO guests (firstName, lastName, floorplan, moveIn, price) VALUES ($1, $2, $3, $4, $5)`;
  let values = (SQL, [req.body.fname, req.body.lname, req.body.fplan, req.body.moveIn, req.body.price])

  return client.query(SQL, values)
    .then(result => {
      res.redirect('saved')
    })
}

// Objects
function Guest (obj) {
  this.fname = obj.fname,
  this.lname = obj.lname,
  this.fplan = obj.fplan,
  this.moveIn = obj.moveIn,
  this.price = obj.price
}
function errorFunction (req, res) {
  res.status(404).send('404 error')
}

// Event Listener Functions


app.listen(PORT, () => console.log(`app is listening on PORT ${PORT}`)
)