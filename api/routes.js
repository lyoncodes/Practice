const express = require('express');
const router = express.Router();
const callback = require('./app');

router.get('/', callback.homeFeed);
router.post('/player/search', callback.searchPlayer, callback.scoringTrend);

module.exports = router;