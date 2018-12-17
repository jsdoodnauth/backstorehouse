const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const AppSchema = new mongoose.Schema({
  isGameCenterEnabled: {
    type: Boolean,
    required: true,
    trim: true
  },
  screenshotUrls: {
    type: String,
    required: true,
    trim: true
  },
  ipadScreenshotUrls: {
    type: String,
    required: true,
    trim: true
  },
  appletvScreenshotUrls: {
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
  artistViewUrl: {
    type: String,
    required: true,
    trim: true
  },
  supportedDevices: {
    type: String,
    required: true,
    trim: true
  },
  advisories: {
    type: String,
    required: true,
    trim: true
  },
  kind: {
    type: String,
    required: true,
    trim: true
  },
  features: {
    type: String,
    required: true,
    trim: true
  },
  averageUserRatingForCurrentVersion: {
    type: Number,
    required: true,
    trim: true
  },
  trackCensoredName: {
    type: String,
    required: true,
    trim: true
  },
  languageCodesISO2A: {
    type: String,
    required: true,
    trim: true
  },
  fileSizeBytes: {
    type: String,
    required: true,
    trim: true
  },
  sellerUrl: {
    type: String,
    required: true,
    trim: true
  },
  contentAdvisoryRating: {
    type: String,
    required: true,
    trim: true
  },
  userRatingCountForCurrentVersion: {
    type: Number,
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
  releaseNotes: {
    type: String,
    required: true,
    trim: true
  },
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
  formattedPrice: {
    type: String,
    required: true,
    trim: true
  },
  sellerName: {
    type: String,
    required: true,
    trim: true
  },
  isVppDeviceBasedLicensingEnabled: {
    type: String,
    required: true,
    trim: true
  },
  primaryGenreId: {
    type: Number,
    required: true,
    trim: true
  },
  currency: {
    type: String,
    required: true,
    trim: true
  },
  wrapperType: {
    type: String,
    required: true,
    trim: true
  },
  version: {
    type: String,
    required: true,
    trim: true
  },
  releaseDate: {
    type: String,
    required: true,
    trim: true
  },
  primaryGenreName: {
    type: String,
    required: true,
    trim: true
  },
  genreIds: {
    type: String,
    required: true,
    trim: true
  },
  minimumOsVersion: {
    type: String,
    required: true,
    trim: true
  },
  artistId: {
    type: Number,
    required: true,
    trim: true
  },
  artistName: {
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
  description: {
    type: String,
    required: true,
    trim: true
  },
  bundleId: {
    type: String,
    required: true,
    trim: true
  },
  currentVersionReleaseDate: {
    type: String,
    required: true,
    trim: true
  },
  averageUserRating: {
    type: Number,
    required: true,
    trim: true
  },
  userRatingCount: {
    type: Number,
    required: true,
    trim: true
  }
});

AppSchema.plugin(timestamp);

const App = mongoose.model('App', AppSchema);
module.exports = App;