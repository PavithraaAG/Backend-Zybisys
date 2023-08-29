
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus' },
  bookingDate: Date,
});

module.exports = mongoose.model('Booking', bookingSchema);