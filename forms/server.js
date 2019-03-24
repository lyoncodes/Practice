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
let ticket = 0;

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
app.post('/guest/add', addGuest)
app.post('/vendor/add', addVendor)
app.get('/*', errorFunction)

// GET route READ functions
function home (req, res) {
  res.render('index', {
    topicHead: `${appName}`,
    ticket: `${ticket}`
  })
}

// POST route UPDATE functions
function addGuest (req, res) {
  incrementTicket()
  let guest = new Guest(req.body)
  let SQL = `INSERT INTO guests(firstName, lastName, floorplan, moveIn, price) VALUES ($1, $2, $3, $4, $5)`;
  let values = (SQL, [guest.fname, guest.lname, guest.fplan, guest.moveIn, guest.price])
  console.log(values)
  return client.query(SQL, values)
    .then(result => {
      res.render('saved', {
        topicHead: `${appName}`,
        userValue: guest,
      })
    })
  .catch(err => handleError(err, res))
}

function addVendor (req, res) {
  let vendor = new Vendor(req.body)
  let SQL = `INSERT INTO vendors(company, firstName, lastName, job, serviceDate, notes) VALUES ($1, $2, $3, $4, $5, $6)`;
  let values = (SQL, [vendor.company, vendor.firstName, vendor.lastName, vendor.job, vendor.serviceDate, vendor.notes])
  console.log(values)
  return client.query(SQL, values)
    .then(result => {
      res.render('saved', {
        topicHead: `${appName}`,
        userValue: vendor,
      })
    })
  .catch(err => handleError(err, res))
}

// Operators
function parseDate (obj) {
  this.time = obj.moveIn.replace('-', '').replace('-', '')
}
function incrementTicket () {
  ticket++;
}

// Objects
function Guest (obj) {
  this.fname = obj.fname,
  this.lname = obj.lname,
  this.fplan = obj.fplan,
  this.moveIn = obj.moveIn,
  this.price = obj.price
}

function Vendor (obj) {
  this.company = obj.company,
  this.fname = obj.fname,
  this.lname = obj.laname,
  this.service = obj.service,
  this.date = obj.serviceDate,
  this.note = obj.note
}

// Error Handling Functions
function errorFunction (req, res) {
  res.status(404).send('404 error')
}

function handleError(err, res) {
  console.log(err)
  if (res) res.status(500).render('error')
}

app.listen(PORT, () => console.log(`app is listening on PORT ${PORT}`)
)



/**TODO
 * Broad Vision:
 * addGuest() adds type "guest" to column "type"
 * addVendor() adds type "vendor" to column "type"
 * 4. build vendor POST route /vendor/add
 * 5. create form with method="POST" action="vendor/route" to hold vendor information (ACP)
 *      * include note field
 *      * add method to convert company entry to lowercase
 *      * add method to parse phone #s for regex ease
 * 6. create db named "Visitors" w/ 2 tables: "Vendor" "Guest"
 * 6. write addVendor() function to INSERT vendor to db! (ACP)
 *      * write conditional expressions for rendering saved page
 */