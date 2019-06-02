'use strict'

// Application Dependencies
const express = require('express');
const superagent = require('superagent');
const parser = require('body-parser');
const NBA = require('nba');
const NBAclient = require('nba-api-client');
const d3 = require('d3');
const dl = require('datalib');
const request = require('request');

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

// Routes
app.get('/', homeFeed)
app.post('/player/search', searchPlayer, scoring)

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

function queryHandler(inputStr) {
  let query = `${inputStr.body.firstname} ${inputStr.body.lastname}`
  return query.toLowerCase();
}

// searchPlayer & POST functions
function searchPlayer (req, res) {
  let query = queryHandler(req);
  const player = NBA.findPlayer(query)

  const id = player.playerId;
  const season = 'Playoffs';
  const games = '1';

    fetchInfo(id)
      .then (result => {
        let newPlayer = new Player(result)
    fetchSplits(id)
      .then (result => {
        let newPlayerSplits = new PlayerSplits(result)
    fetchProfile(id)
      .then (result => {
        let newPlayerCareerSplits = new PlayerCareerSplits(result)
        let scoringTrend = scoring(newPlayerSplits,newPlayerCareerSplits)
    fetchShotChart(id, season, games)
      .then (result => {
        let data = result.shot_Chart_Detail
    // renderShotChart(data)
    // install shot chart function here
  res.render('show', {newPlayer, newPlayerSplits, newPlayerCareerSplits, scoringTrend, data})
                  })
              })
          })
      })
  .catch(error => console.log('something is wrong -> :', error))
}

// fetch functions

function fetchInfo(id){
  return NBA.stats.playerInfo({PlayerID: `${id}`})
}

function fetchSplits(id){
  return NBA.stats.playerSplits({PlayerID: `${id}`})
}

function fetchProfile(id){
  return NBA.stats.playerProfile({PlayerID: `${id}`})
}

function fetchShotChart(id, season, games){
  return NBA.stats.shots({
    PlayerID: `${id}`,
    SeasonType: `${season}`,
    LastNGames: `${games}`,
  })
}
// operator functions
function scoring(seasonAvg, careerAvg) {
  let result = [];
  let ppgDiff = seasonAvg.ppg - careerAvg.ppg;
  let rebDiff = seasonAvg.reb - careerAvg.reb;
  let astDiff = seasonAvg.ast - careerAvg.ast;
  result.push(ppgDiff, rebDiff, astDiff);
  return result
}


// Object Assignments
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
    * if trend is +, display the text as green
    * if trend is -, display the text as red
    * Render All Seasons to Table
  * Advaned Analytics -- SynergyTeamsPlayTypeStats
* Add Shotchart

*/