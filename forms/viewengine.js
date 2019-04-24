'use strict'
let reference = require('./dependency');
let app = reference.server;

const set = app.set('view engine', 'ejs');
const urlencoded = app.use(reference.parser.urlencoded({ extended: false }));
const staticPath = app.use(reference.express.static('./public'))
const jsonParse = app.use(reference.parser.json());

module.exports.set = set;
module.exports.urlencoded = urlencoded;
module.exports.staticPath = staticPath;
module.exports.jsonParse = jsonParse;