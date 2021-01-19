const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoastSchema = new Schema({
  name: { type: String, required: true },
});

RoastSchema.virtual('url').get(function () {
  return '/roast' + this._id;
});

module.exports = mongoose.model('Roast', RoastSchema);
