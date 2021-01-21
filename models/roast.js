const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoastSchema = new Schema({
  name: { type: String, required: true },
  // WILL BENEFIT FROM HAVING DESCRIPTION ATTRIBUTE
});

RoastSchema.virtual('url').get(function () {
  return `/inventory/roast/${this._id}`;
});

module.exports = mongoose.model('Roast', RoastSchema);
