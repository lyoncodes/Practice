const constructors = require('./objects');
const NBA = require('nba');
const search = require('./search');

// GET functions
function dayToday () {
 let newDay = new Date();
 let today = new Day(newDay);
 return today
}

function homeFeed (req, res) {
 let today = dayToday();
 NBA.stats.scoreboard({GameID: "00", DayOffset: "0", gameDate:`${today.month} - ${today.day} - ${today.year}`})
 .then (result => {
  let games = result.lineScore.map(games => new Feed(games));
  let eastStandings = result.eastConfStandingsByDay.map(standings => new EastStandings(standings));
  let westStandings = result.westConfStandingsByDay.map(standings => new WestStandings(standings));
  res.render('index', {result, games, eastStandings, westStandings})
 })
}

// Handlers 
function queryHandler(inputStr) {
 let query = `${inputStr.body.firstname} ${inputStr.body.lastname}`;
 query.toLowerCase();
 return NBA.findPlayer(query)
}

function seasonHandler(date){
 if (date === 4 || date === 5 || date === 6){
   return 'Playoffs'
 } else {
   return 'Regular Season'
 };
}

// searchPlayer
function searchPlayer (req, res) {
 const player = queryHandler(req);
 const id = player.playerId;
 const today = dayToday();
 const season = seasonHandler(today.month);
 const games = '1';

   fetchInfo(id)
     .then (result => {
       let newPlayer = new Player(result);
   fetchSplits(id)
     .then (result => {
       let newPlayerSplits = new PlayerSplits(result)
   fetchProfile(id)
     .then (result => {
       let seasonStats = result.seasonTotalsRegularSeason.map(stats => new seasonSplits(stats));
       let newPlayerCareerSplits = new PlayerCareerSplits(result);
       let trend = scoringTrend(newPlayerSplits,newPlayerCareerSplits);
   fetchShotChart(id, season, games)
     .then (result => {
       let data = result.shot_Chart_Detail
       console.log(data);
 res.render('show', {newPlayer, newPlayerSplits, seasonStats, newPlayerCareerSplits, trend, data})
     })
     })
     })
     })
 .catch(error => console.log('something is wrong -> :', error));
}

function scoringTrend(seasonAvg, careerAvg) {
 let result = [];
 let ppgDiff = seasonAvg.ppg - careerAvg.ppg;
 let rebDiff = seasonAvg.reb - careerAvg.reb;
 let astDiff = seasonAvg.ast - careerAvg.ast;
 result.push(ppgDiff, rebDiff, astDiff);
 return result
}

// Object Assignments
const Day = constructors.Day;
const Player = constructors.Player;
const PlayerSplits = constructors.PlayerSplits;
const seasonSplits = constructors.seasonSplits;
const PlayerCareerSplits = constructors.PlayerCareerSplits;
const Feed = constructors.Feed;
const EastStandings = constructors.EastStandings;
const WestStandings = constructors.WestStandings;
const PlayerFeed = constructors.PlayerFeed;
const shotChart = constructors.shotChart;

// fetch functions
const fetchInfo = search.fetchInfo;
const fetchSplits = search.fetchSplits;
const fetchProfile = search.fetchProfile;
const fetchShotChart = search.fetchShotChart;

module.exports = {homeFeed, queryHandler, seasonHandler, searchPlayer, scoringTrend}