'use strict'

// Application Dependencies
const express = require('express');
const parser = require('body-parser');

// Module Imports
const routes = require('./routes')

// Load environment variables
require('dotenv').config() 

// HTTP Server
const app = express()

// PORT
const PORT = process.env.PORT || 3000

// Middleware & View Engine
app.set('view engine', 'ejs')
app.use(parser.urlencoded({ extended: true }))
app.use(express.static('./public'))

// Routes
app.use('/', routes);

// Listen
app.listen(PORT, () => {
 console.log(`Listening on PORT: ${PORT}`)
})

module.exports = app;
