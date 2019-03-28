'use strict'

// Application Dependencies
const express = require('express')
const superagent = require('superagent')

// Load environment variables
require('dotenv').config()

// HTTP Server
const app = express()

// PORT
const PORT = process.env.PORT || 3000

// Set the view engine
app.set('view engine', 'ejs')
app.use(express.static('./public'))

//Error Handling
function handleError (res) {
 res.status(404).send('404 error')
}

// Routes
app.get('*', home)

// READ functions

function home (req, res) {
 res.render('index')
}

// Listen
app.listen(PORT, () => {
 console.log(`Listening on PORT: ${PORT}`)
})