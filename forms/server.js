'use strict'
// Node Dependency
let dependencies = require('./dependency');
let postgres = require('./postgres');
let view = require('./viewengine');
let guests = require('./guest')
let search = require('./server/router/routes/search')

const express = dependencies.express;
const pg = dependencies.pg;
const parser = dependencies.parser;
const dotenv = dependencies.dotenv;

// Build HTTP Server
const app = dependencies.server;
const appName = "Day Today"

//PORT
const PORT = process.env.PORT || 3000;

// Database Setup
const client = postgres.client;
const connect = postgres.connect;
const error = postgres.error;

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
app.post('/searchByPrice', searchByPrice)
app.get('/*', errorFunction)


// GET route READ functions
function home (req, res) {
  let SQL = 'SELECT * FROM guests'
  return client.query(SQL)
  .then(data => {
    let result = data.rows;
    let guestArr = []
    for (let i = result.length-5; i < result.length; i ++) {
      guestArr.push(result[i])
    }
    let guests = guestArr.map(el => new Guest(el))
      res.render('index', {
        topicHead: `${appName}`,
        guests: guests
      })
  })  
}

let searchGuest = search.searchGuest;
console.log(searchGuest);

// function searchGuest (req, res) {
//   let searchName = req.body.searchName;
//   let searchEmail = req.body.searchEmail;
//   let moveIn = req.body.searchMoveIn;
//   let searchFloor = req.body.floorplan;
//   let SQL = `SELECT * FROM guests WHERE lastname=$1 OR email=$2 OR movein=$3 OR floorplan=$4`
//   let values = [searchName, searchEmail, moveIn, searchFloor]
//   return client.query(SQL, values)
//   .then(data => {
//     let guests = data.rows.map(el => new Guest(el))
//     console.log(guests)
//     res.render('guestView', {
//       topicHead: `${appName}`,
//       guests: guests
//     })
//   })
// }

function searchByPrice (req, res) {
  // return all results where col price is $500 greater than and $500 less than searchPrice
  let searchPrice = req.body.searchPrice
  let MAX = searchPrice + 500;
  let MIN = searchPrice - 500;
  let SQL = `SELECT * FROM guests WHERE price BETWEEN $1 AND $2`
  let values = [MIN, MAX];
  return client.query(SQL, values)
  .then (data => {
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
let Guest = guests.Guest;
let Vendor = guests.Vendor;

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
 * Organize routers for each route and seperate using modules
 * Modularize functions and object constructors
 * Note Field for Vendors
      * include note field
 * Form Validation
      * normalize phone numbers and emails in javascript
      * add method to convert company entry to lowercase
      * add method to parse phone #s for regex ease
 * Search by MFTE

 * Fuzzy search by name
*/