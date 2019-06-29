'use strict'
// define console logs

// import dependencies
require('dotenv').config()
const express = require('express')
const pg = require('pg')

// app 
const app = express() 

// PORT
const PORT = process.env.PORT || 3000
app.use(express.static('./public'))

// Database Setup
const client = new pg.Client(process.env.DATABASE_URL)
client.connect()
client.on('error', err => console.error(err))

// Set the view engine
app.set('view engine', 'ejs')

// Routes
app.get('/', home)
// app.get('/home', home)
// app.get('/resume', resume)
// app.get('/CVV', cvv)
// app.get('/nba', nba)

// Rendering Functions
function home(req, res) {
 res.render('../views/index.ejs')
}
// function resume(req, res) {
//  res.render('resume')
// }
// function cvv(req, res) {
//  res.render('CVV')
// }
// function nba(req, res) {
//  res.render('nba')
// }

// Read & Save Functions

app.listen(PORT, () => console.log(`listening on port ${3000}`))

// Error handling
function handleError (res) {
  res.status(404).send('Resource Unavailable!')
}

// I'm in napa
