const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitySchema = new Schema({
  name: String,
  location: {
    type: {type: String},
    coordinates: []
  }
});

CitySchema.index({location: '2dsphere'});

const City = mongoose.model('City', CitySchema);

module.exports = City;