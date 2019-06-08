'use strict'
const NBA = require('nba');

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

module.exports = {
fetchInfo,
fetchSplits,
fetchProfile,
fetchShotChart
}