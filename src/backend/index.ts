const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
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

app.post('/modify-order/:id', async (req, res) => {
  const response = res.body;
  console.log(response);
});

app.post('/exit-order/:id', async (req, res) => {
  const response = res.body;
  console.log(response);
});

// Routes
require('./routes/routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
