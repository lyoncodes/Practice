'use strict'

let reference = require('./dependency');

const client = new reference.pg.Client(process.env.DATABASE_URL);
const connect = client.connect();
const error = client.on('error', err => console.log(err))

module.exports.client = client;
module.exports.connect = connect;
module.exports.error = error; 