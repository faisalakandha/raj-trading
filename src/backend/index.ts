//import Fyers from '../api/fypers-api';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('../api/fypers-api');

const mongoUri = 'mongodb+srv://faisalakandha:faisalakandha123@cluster0.cd8qa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("DB Connected Successfully");
});

const port = 3000 || process.env.PORT;

app.get('/', (req, res) => {
  res.json({message: 'alive'});
});

//var fyer = new Fyers('client','secret','password','app','rdr');

//var fApi = new FyersApi('XS29344','http://localhost/seller/settings/shop-settings');


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

