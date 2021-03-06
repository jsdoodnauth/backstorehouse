const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const TermSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  counter: {
    type: Number,
    required: true,
    default: 0
  },
  isNext: {
    type: Boolean,
    default: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

TermSchema.plugin(timestamp);

const Term = mongoose.model('Term', TermSchema);
module.exports = Term;