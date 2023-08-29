const Bus = require('../models/Bus');

exports.getAllBuses = (req, res) => {
  Bus.find({}, (err, buses) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!buses || buses.length === 0) {
      return res.status(404).json({ error: 'No available buses found' });
    }

    res.json({ buses });
  });
};
