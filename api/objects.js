'use strict'

function Day (date) {
 this.year = date.getFullYear();
 this.month = (date.getMonth() + 1);
 this.day = date.getDate();
} 

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

function Feed (obj) {
  this.id = obj.gameId;
  this.team = obj.teamAbbreviation;
  this.record = obj.teamWinsLosses;
  this.q1 = obj.ptsQtr1;
  this.q2 = obj.ptsQtr2;
  this.q3 = obj.ptsQtr3;
  this.q4 = obj.ptsQtr4;
  this.final = obj.pts;
}

function PlayerFeed (obj) {
  this.id = obj.gameId;
  this.qtr = obj.period;
  this.event = obj.eventType;
  this.play = obj.actionType;
  this.shot = obj.shotType;
  this.zone = obj.shotZoneRange;
}

function shotChart (obj) {
  this.shotType = obj.shotType;
  this.shotZoneBasic = obj.shotZoneBasic;
  this.shotZoneArea = obj.shotZoneArea;
  this.shotDistance = obj.shotDistance;
  this.locX = obj.locX;
  this.locY = obj.locY;
}

module.exports = {
  Day: Day,
  Player: Player,
  PlayerSplits: PlayerSplits,
  PlayerCareerSplits: PlayerCareerSplits,
  Feed: Feed,
  PlayerFeed: PlayerFeed,
  shotChart: shotChart
}