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
 const player = NBA.findPlayer(searchStr)
 NBA.stats.playerInfo({ PlayerID: player.playerId })
 .then (result => {
  let newPlayer = new Player(result)
  console.log(newPlayer)
 })
 NBA.stats.playerSplits({ PlayerID: player.playerId })
 .then (result => {
  console.log(result)
  // let newPlayerStats = new PlayerStats(result)
  // console.log(newPlayerStats)
 })
}

// Objects
function Player (obj) {
 this.id = obj.commonPlayerInfo[0].personId;
 this.name = obj.commonPlayerInfo[0].displayFirstLast;
 this.position = obj.commonPlayerInfo[0].position;
 this.team = obj.commonPlayerInfo[0].teamName;
 this.draftYear = obj.commonPlayerInfo[0].draftYear;
 this.draftRound = obj.commonPlayerInfo[0].draftRound;
 this.draftNumber = obj.commonPlayerInfo[0].draftNumber;
 this.college = obj.commonPlayerInfo[0].school;
}

// Listen
app.listen(PORT, () => {
 console.log(`Listening on PORT: ${PORT}`)
})