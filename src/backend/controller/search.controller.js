const db = require('../models');

const { Instrument } = db;

exports.findAllInstrument = (req, res) => {
  Instrument.find({})
    // eslint-disable-next-line promise/always-return
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
};
