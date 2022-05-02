const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const corsOptions = {
  origin: 'http://localhost:8080',
};
app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
app.get('/test', (req, res) => {
  res.json({ message: 'Welcome to test endpoint.' });
});

// Routes
require('./routes/routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
