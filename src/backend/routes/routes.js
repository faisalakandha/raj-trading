module.exports = (app) => {
  const instrument = require('../controller/search.controller');
  const router = require('express').Router();

  router.get('/get-instruments', instrument.findAllInstrument);

  app.use('/api', router);

};
