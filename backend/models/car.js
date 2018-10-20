const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
  name: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  mileage: { type: Number, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  telephone: { type: String, required: true }

});

module.exports = mongoose.model('Car', carSchema);
