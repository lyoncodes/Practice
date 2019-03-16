'use strict'

// Node Dependency
require('dotenv').config()
const express = require('express')

// Build HTTP Server
const app = express();

//PORT
const PORT = process.env.PORT || 3000;

// Set the view engine
app.set('view engine', 'ejs')

// Routes
app.get('/home', home)
app.get('/*', errorFunction)

function home (req, res) {
 res.render('index')
}

function errorFunction (req, res) {
  res.status(404).send('404 error')
}
app.listen(PORT, () => console.log(`app is listening on PORT ${PORT}`)
)