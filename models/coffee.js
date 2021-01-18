const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CoffeeSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  origin: { type: Schema.Types.ObjectId, ref: 'Origin', required: true },
  roast: { type: Schema.Types.ObjectId, ref: 'Roast', required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

// VIRTUALS
CoffeeSchema.virtual('url').get(function () {
  return '/coffee' + this._id;
});

module.exports = mongoose.model('Coffee', CoffeeSchema);
