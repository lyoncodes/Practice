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
app.use(parser.urlencoded({ extended: true }))
app.use(express.static('./public'))

//Error Handling
function handleError (res) {
 res.status(400).send('400 error')
}

// Routes
app.get('/', homeFeed)
app.post('/player/search', search)


// GET functions
function homeFeed (req, res) {
  res.render('index')

}

// search & POST functions
function search (req, res) {
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
          console.log(newPlayerCareerSplits)

        res.render('show', {newPlayer, newPlayerSplits, newPlayerCareerSplits})
      })
    })
  })
}

// Objects  
function Player (obj) {
 this.id = obj.commonPlayerInfo[0].personId;
 this.name = obj.commonPlayerInfo[0].displayFirstLast;
 this.position = obj.commonPlayerInfo[0].position;
 this.height = obj.commonPlayerInfo[0].height;
 this.weight = obj.commonPlayerInfo[0].weight;
 this.jersey = obj.commonPlayerInfo[0].jersey;
 this.team = obj.commonPlayerInfo[0].teamName;
 this.draftYear = obj.commonPlayerInfo[0].draftYear;
 this.draftRound = obj.commonPlayerInfo[0].draftRound;
 this.draftNumber = obj.commonPlayerInfo[0].draftNumber;
 this.college = obj.commonPlayerInfo[0].school;
}

function PlayerSplits (obj) {
 this.season = obj.overallPlayerDashboard[0].groupValue;
 this.gp = obj.overallPlayerDashboard[0].gp;
 this.mpg = obj.overallPlayerDashboard[0].min;
 this.fgPct = obj.overallPlayerDashboard[0].fgPct;
 this.fg3Pct = obj.overallPlayerDashboard[0].fg3Pct;
 this.ftPct = obj.overallPlayerDashboard[0].ftPct;
 this.reb = obj.overallPlayerDashboard[0].dreb;
 this.oreb = obj.overallPlayerDashboard[0].oreb;
 this.ast = obj.overallPlayerDashboard[0].ast;
 this.blk = obj.overallPlayerDashboard[0].blk;
 this.stl = obj.overallPlayerDashboard[0].stl;
 this.to = obj.overallPlayerDashboard[0].tov;
 this.pf = obj.overallPlayerDashboard[0].pf;
 this.ppg = obj.overallPlayerDashboard[0].pts;
 this.plusMinus = obj.overallPlayerDashboard[0].plusMinus
}

function PlayerCareerSplits (obj) {
  this.gp = obj.careerTotalsRegularSeason[0].gp;
  this.mpg = obj.careerTotalsRegularSeason[0].min;
  this.fgPct = obj.careerTotalsRegularSeason[0].fgPct;
  this.fg3Pct = obj.careerTotalsRegularSeason[0].fg3Pct;
  this.ftPct = obj.careerTotalsRegularSeason[0].ftPct;
  this.reb = obj.careerTotalsRegularSeason[0].reb;
  this.oreb = obj.careerTotalsRegularSeason[0].oreb;
  this.ast = obj.careerTotalsRegularSeason[0].ast;
  this.blk = obj.careerTotalsRegularSeason[0].blk;
  this.stl = obj.careerTotalsRegularSeason[0].stl;
  this.to = obj.careerTotalsRegularSeason[0].tov;
  this.pf = obj.careerTotalsRegularSeason[0].pf;
  this.ppg = obj.careerTotalsRegularSeason[0].pts
}

// Listen
app.listen(PORT, () => {
 console.log(`Listening on PORT: ${PORT}`)
})

/* TODO:

// TASKS
* Refactor search function

// FEATURES
* Transaction Feed on Front page
* Add Comparison Analytics
  * Player Career Stats
    1. Request different season than current
    2. Request all seasons until current
    * Render All Seasons to Table
  * Advaned Analytics -- SynergyTeamsPlayTypeStats
*/