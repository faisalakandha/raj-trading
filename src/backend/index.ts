//import Fyers from '../api/fypers-api';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('../api/fypers-api');
var fs = require('fs'),
  nconf = require('nconf');

nconf.argv().env().file({ file: 'appconfig.json' });


const mongoUri = nconf.get('dbInfo:dburi');

mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("DB Connected Successfully");
});

console.log(nconf.get('dbInfo:database'));
const port = 3000 || nconf.get("serverInfo:port");

app.get('/', (req, res) => {
  res.json({ message: 'alive' });
});

//var fyer = new Fyers('client','secret','password','app','rdr');

//var fApi = new FyersApi('XS29344','http://localhost/seller/settings/shop-settings');

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
