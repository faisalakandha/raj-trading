const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
import axios from 'axios';
import db from '../backend/models/index';
const fyers = require('fyers-api-v2');
// fyers.setAppId('FMR00CRGAK-100');

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Oauth DB Connected Successfully');
  });


app.use(cors());
app.use(express.json());
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route

app.get('/test', async (req, res) => {
  res.send("This is a test endpoint !");
});

app.post('/set-appId-access', async (req, res) => {
  const response = req.body;
  console.log("Modify Order", response);
  //res.status(200).json({ success: response });
  const AuthSession = db.mongoose.model('session');

  AuthSession.findOne().sort({ field: 'asc', _id: -1 }).limit(1)
    .then(data => {
      console.log('DB DATA FROM place-order API: ', data.access);
      const requestData = req.body;
      console.log(requestData);
      fyers.setAppId('FMR00CRGAK-100');
      fyers.setAccessToken(data.access);
      res.status(200).json({ success: 'ID + Token SET' });
    }).catch((e) => {
      res.status(500).json({ error: e });
    })
});


app.get('/get-searched-symbols/:value', async (req, res) => {

  console.log("GET REQUEST SYMBOL SEARCH::::::  ", req);

  axios.get(`https://api.truedata.in/getAllSymbols?segment=all&user=FYERS1806&password=14Qa3p25&search=${req.params.value}`)
    .then(function (response) {
      console.log(" Get Symbole DATA::::  ", response.data);
      res.status(200).json({ data: response.data });
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });


});


app.get('/get-positions', async (req, res) => {

  fyers.get_positions().then((response) => {

    res.status(200).json({ success: response })

  }).catch((e) => {
    res.status(500).json({ error: e })
  });
});

app.post('/place-order', async (req, res) => {

  const AuthSession = db.mongoose.model('session');

  AuthSession.findOne().sort({ field: 'asc', _id: -1 }).limit(1)
    .then(data => {
      console.log('DB DATA FROM place-order API: ', data.access);
      const requestData = req.body;
      console.log(requestData);
      const reqBody = {
        data: requestData,

        app_id: "FMR00CRGAK-100",

        token: data.access

      }
      fyers.place_order(reqBody).then((response) => {

        res.status(200).json({ success: response })

      }).catch((e) => {
        res.status(500).json({ error: e })
      });

    })
});

app.post('/modify-order', async (req, res) => {
  const response = req.body;
  console.log("Modify Order", response);
  //res.status(200).json({ success: response });
  const AuthSession = db.mongoose.model('session');

  AuthSession.findOne().sort({ field: 'asc', _id: -1 }).limit(1)
    .then(data => {
      console.log('DB DATA FROM place-order API: ', data.access);
      const requestData = req.body;
      console.log(requestData);
      const reqBody = {
        data: requestData,

        app_id: "FMR00CRGAK-100",

        token: data.access

      }
      fyers.modify_order(reqBody).then((response) => {

        //console.log(response)
        res.status(200).json({ success: response })

      }).catch((e) => {
        res.status(500).json({ error: e })
      });

    })
});

app.post('/exit-order', async (req, res) => {
  const response = res.body;
  console.log(response);

  const AuthSession = db.mongoose.model('session');

  AuthSession.findOne().sort({ field: 'asc', _id: -1 }).limit(1)
    .then(data => {
      console.log('DB DATA FROM place-order API: ', data.access);
      const requestData = req.body;
      console.log("REQ DATA EXIT: ", requestData);
      const reqBody = {
        data: requestData,

        app_id: "FMR00CRGAK-100",

        token: data.access

      }
      fyers.exit_position(reqBody).then((response) => {

        //console.log(response)
        res.status(200).json({ success: response })

      }).catch((e) => {
        res.status(500).json({ error: e })
      });

    })
});

// Routes
require('./routes/routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
