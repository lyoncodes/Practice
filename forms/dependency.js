'use strict'
// Node Dependency
const express = require('express')
const pg = require('pg')
const parser = require('body-parser')
const dotenv = require('dotenv').config()
const server = express();

module.exports.express = express;
module.exports.pg = pg;
module.exports.parser = parser;
module.exports.dotenv = dotenv;
module.exports.server = server;