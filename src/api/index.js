const fs = require('fs'),
const  nconf = require('nconf');

nconf.argv().env().file({ file: 'appconfig.json' });

const fyId = nconf.get("fyersInfo:fyId");
const fyUri = nconf.get("fyersInfo:fyUri");

const fyers = require('fyers-api-v2');
fyers.Promise = global.Promise;
const fy = {};
fy.fyers = fyers;
fy.fyId = fyId;
fy.url = fyUri;
module.exports = fy;
