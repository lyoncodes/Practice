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
app.post('/guest/add', addGuest)
app.post('/vendor/add', addVendor)
app.post('/searches', searchGuest)
app.get('/*', errorFunction)

// GET route READ functions
function home (req, res) {
  let SQL = 'SELECT * FROM guests'
  return client.query(SQL)
  .then(data => {
    let result = data.rows;
    let guestArr = []
    for (let i = result.length-6; i < result.length; i ++) {
      guestArr.push(result[i])
    }
    let guests = guestArr.map(el => new Guest(el))
      res.render('index', {
        topicHead: `${appName}`,
        guests: guests
      })
  })
}

function searchGuest (req, res) {
  let searchName = req.body.searchName;
  let searchPrice = req.body.searchPrice ? req.body.searchPrice : null;
  let searchEmail = req.body.searchEmail;
  let moveIn = req.body.searchMoveIn;
  let searchFloor = req.body.floorplan;
  let SQL = `SELECT * FROM guests WHERE lastname=$1 OR price=$2 OR email=$3 OR movein=$4 OR floorplan=$5`
  let values = [searchName, searchPrice, searchEmail, moveIn, searchFloor]
  return client.query(SQL, values)
    .then(data => {
      let guests = data.rows.map(el => new Guest(el))
      console.log(guests)
      res.render('guestView', {
        topicHead: `${appName}`,
        guests: guests
      })
    })
}

// POST route UPDATE functions
function addGuest (req, res) {
  let guest = new Guest(req.body)
  // let regPhone = normalizePhone(guest.telephone);
  let SQL = `INSERT INTO guests(classification, firstname, lastname, email, telephone, floorplan, movein, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`
  let values = (SQL, [guest.classification, guest.firstname, guest.lastname, guest.email, guest.telephone, guest.floorplan, guest.movein, guest.price])
  return client.query(SQL, values)
    .then(result => {
      res.render('results', {
        topicHead: `${appName}`,
        userValue: guest
      })
    })
  .catch(err => handleError(err, res))
}

function addVendor (req, res) {
  let vendor = new Vendor(req.body)
  let SQL = `INSERT INTO vendors(classification, company, firstName, lastName, job, serviceDate, notes) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
  let values = (SQL, [vendor.classification, vendor.company, vendor.firstName, vendor.lastName, vendor.job, vendor.serviceDate, vendor.notes])
  return client.query(SQL, values)
    .then(result => {
      res.render('saved', {
        topicHead: `${appName}`,
        userValue: vendor,
      })
    })
  .catch(err => handleError(err, res))
}

// Operators & Normalizers
// function normalizePhone(number) {

// }

function increment (thing) {
  return thing++;
}

// Objects
function Guest (obj) {
  this.classification = "guest"
  this.firstname = obj.firstname ? obj.firstname : 'n/a',
  this.lastname = obj.lastname ? obj.lastname : 'n/a',
  this.email = obj.email ? obj.email : 'n/a',
  this.telephone = obj.telephone ? obj.telephone : 'n/a',
  this.floorplan = obj.floorplan ? obj.floorplan : 'n/a',
  this.movein = obj.movein ? obj.movein : 'n/a',
  this.price = obj.price ? obj.price : 'n/a'
}

function Vendor (obj) {
  this.classification = "vendor"
  this.company = obj.company,
  this.fname = obj.fname,
  this.lname = obj.laname,
  this.service = obj.service,
  this.date = obj.serviceDate,
  this.note = obj.note
}
var guestImport = require('./public/js/objects')
console.log(guestImport.Gu)
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
 * Note Field for Vendors
      * include note field
 * Form Validation
      * normalize phone numbers and emails in javascript
      * add method to convert company entry to lowercase
      * add method to parse phone #s for regex ease
 * Search by MFTE
*/