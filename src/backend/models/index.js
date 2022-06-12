const fs = require('fs'),
const nconf = require('nconf');

nconf.argv().env().file({ file: 'appconfig.json' });

const dbConfig = nconf.get("dbInfo:dburi");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = dbConfig;
db.Session = require("./login.model")(mongoose);
db.Instrument = require('./instrument.model')(mongoose);
db.Watchlist = require('./watchlist.model')(mongoose);

module.exports = db;
