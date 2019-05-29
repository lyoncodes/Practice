'use strict'

// Application Dependencies
const express = require('express');
const superagent = require('superagent');
const parser = require('body-parser');
const NBA = require('nba');
const NBAclient = require('nba-api-client');
const objects = require('./objects');


// Load environment variables
require('dotenv').config() 

// HTTP Server
const app = express()

// PORT
const PORT = process.env.PORT || 3000

// Set the view engine
app.set('view engine', 'ejs')
app.use(parser.urlencoded({ extended: true }))
app.use(express.static('./public'))

// Middleware & Error Handling
function handleError (res) {
 res.status(400).send('400 error')
}

function asyncHandler(callback) {
  return async(req, res, next) => {
    try {
      callback(req, res, next);
    } catch(err) {
        res.send('YOU DIED')
    }
  }
}

// Routes
app.get('/', homeFeed)
app.post('/player/search', searchPlayer)
app.post('/player/search', scoring)

// Global Operators
function dayToday () {
  let newDay = new Date();
  let today = new Day(newDay);
  return today
}

// GET functions
function homeFeed (req, res) {
  let today = dayToday();
  NBA.stats.scoreboard({GameID: "00", DayOffset: "0", gameDate:`${today.month} - ${today.day} - ${today.year}`})
  .then (result => {
    let games = result.lineScore.map(games => new Feed(games))
    res.render('index', {result: result, games: games})
  })
}

// searchPlayer & POST functions
function searchPlayer (req, res) {
  let query = `${req.body.firstname} ${req.body.lastname}`
  query = query.toLowerCase();
  const player = NBA.findPlayer(query)

      NBA.stats.playerInfo({ PlayerID: player.playerId })
      .then (result => {
        let newPlayer = new Player(result)

        NBA.stats.playerSplits({ PlayerID: player.playerId })
        .then (result => {
          let newPlayerSplits = new PlayerSplits(result)

          NBA.stats.playerProfile({ PlayerID: player.playerId })
          .then (result => {
            let newPlayerCareerSplits = new PlayerCareerSplits(result)
            let scoringTrend = scoring(newPlayerSplits.ppg, newPlayerCareerSplits.ppg)

            NBA.stats.shots({ PlayerID: player.playerId, SeasonType: "Playoffs", LastNGames: "1" })
            .then (result => {
              let data = result.shot_Chart_Detail
              res.render('show', {newPlayer, newPlayerSplits, newPlayerCareerSplits, scoringTrend, data: data})
            })
        })
      })
   })
}

function scoring(careerAvg, seasonAvg) {
    return careerAvg - seasonAvg;
}

// Objects
const Day = objects.Day;
const Player = objects.Player;
const PlayerSplits = objects.PlayerSplits;
const PlayerCareerSplits = objects.PlayerCareerSplits;
const Feed = objects.Feed;
const PlayerFeed = objects.PlayerFeed;
const shotChart = objects.shotChart;

// Listen
app.listen(PORT, () => {
 console.log(`Listening on PORT: ${PORT}`)
})

/* TODO:

// TASKS
* Style homepage
* Refactor functions with module.exports
  * Operators
* Refactor search function with async await
* Add conference standings to home page

// FEATURES
* Transaction Feed on Front page
  1. Create a date object and use it to render most recent transactions?
    * maybe start with brute force to get first 10 
    2. Instantiate new object for front end by mapping obj.lineScore
* Add Comparison Analytics
  * Player Career Stats
    1. Request different season than current
    2. Request all seasons until current
    * Render All Seasons to Table
  * Advaned Analytics -- SynergyTeamsPlayTypeStats
*/