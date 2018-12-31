const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const AppSummarySchema = new mongoose.Schema({
  trackId: {
    type: Number,
    required: true,
    trim: true
  },
  trackName: {
    type: String,
    required: true,
    trim: true
  },
  trackViewUrl: {
    type: String,
    required: true,
    trim: true
  },
  trackContentRating: {
    type: String,
    required: true,
    trim: true
  },
  genres: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    trim: true
  },
  formattedPrice: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  artworkUrl60: {
    type: String,
    required: true,
    trim: true
  },
  artworkUrl512: {
    type: String,
    required: true,
    trim: true
  },
  artworkUrl100: {
    type: String,
    required: true,
    trim: true
  },
  version: {
    type: String,
    required: true,
    trim: true
  },
  sellerName: {
    type: String,
    required: true,
    trim: true
  },
  sellerUrl: {
    type: String,
    required: true,
    trim: true
  },
  releaseDate: {
    type: String,
    required: true,
    trim: true
  },
  userRatingCount: {
    type: Number,
    required: true,
    trim: true
  },
  averageUserRating: {
    type: Number,
    required: true,
    trim: true
  },
  currentVersionReleaseDate: {
    type: String,
    required: true,
    trim: true
  },
  userRatingCountForCurrentVersion: {
    type: Number,
    required: true,
    trim: true
  },
  averageUserRatingForCurrentVersion: {
    type: Number,
    required: true,
    trim: true
  }
});

AppSummarySchema.plugin(timestamp);

const AppSummary = mongoose.model('AppSummary', AppSummarySchema);
module.exports = AppSummary;