'use strict'

// Application Dependencies
const express = require('express');
const superagent = require('superagent');
const parser = require('body-parser');
const NBA = require('nba');

// Load environment variables
require('dotenv').config()

// HTTP Server
const app = express()

// PORT
const PORT = process.env.PORT || 3000

// Set the view engine
app.set('view engine', 'ejs')
app.use(parser.urlencoded({ extended: false }))
app.use(express.static('./public'))

//Error Handling
function handleError (res) {
 res.status(400).send('400 error')
}

// Routes
app.get('/', home)
app.post('/player/search', getPlayer)

// GET functions
function home (req, res) {
 res.render('index')
}

function getPlayer (req, res) {
 let query = `${req.body.firstname} ${req.body.lastname}`
 query = query.toLowerCase();
 res.render('show')
 return searchPlayer(query)
}

function searchPlayer (searchStr) {
 const Player = NBA.findPlayer(searchStr)
 const Stats = NBA.stats.playerInfo({PlayerID: Player.playerId})
 .then (console.log)

 console.log(Player)
 console.log(Stats)
}

// getPlayer() formats query for searchPlayer()
// create Player object for basic return properties
// crete a searchPlayer() function that instantiates Player

// Objects

// Listen
app.listen(PORT, () => {
 console.log(`Listening on PORT: ${PORT}`)
})