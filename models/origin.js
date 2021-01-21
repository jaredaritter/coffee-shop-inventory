const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OriginSchema = new Schema({
  country: { type: String, required: true },
  producer: { type: String },
});

OriginSchema.virtual('url').get(function () {
  return `/inventory/origin/${this._id}`;
});

module.exports = mongoose.model('Origin', OriginSchema);
