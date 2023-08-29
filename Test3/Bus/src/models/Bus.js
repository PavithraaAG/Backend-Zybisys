
const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  name: String,
  price: Number,
  
});

module.exports = mongoose.model('Bus', busSchema);
