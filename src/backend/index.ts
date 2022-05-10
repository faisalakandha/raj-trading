const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

var whitelist = ['http://localhost:8080/', 'http://localhost:1212']

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors());
app.use(express.json());
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route

app.get('/test', async (req, res) => {
  res.send("This is a test endpoint !");
});

// Routes
require('./routes/routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
