const errors = require('restify-errors');
const axios = require('axios');
const schedule = require('node-schedule');
const { getITunesTermLink } = require('../requests/itunes');
const Term = require('../models/Terms');
const App = require('../models/Apps');
const AppSummary = require('../models/AppSummary');
const testMode = false;
const cronOn = true;

const job = cronOn && schedule.scheduleJob('*/5 * * * * *', () => {
  console.log('CRON JOB: ' + new Date());
  getNextSearchTerm();
});

const getNextSearchTerm = async () => {
  try {
    const term = Term.findOne({isNext: true}, (errors, item) => {
      let termName = '';
      if (errors) {
        console.log(`Error in terms: ${errors}`);
        next();
      }

      if (!item) {
        if (testMode) {
          const updateTerms = Term.updateMany({$set: {isNext: true}}, (errors, item) => {
            if (errors) {
              console.log('Error resetting terms');
            }
          });
          const updateTermsCounter = Term.find({counter: 0}).updateMany({$set: {isNext: true, counter: 1}}, (errors, item) => {
            if (errors) {
              console.log('Error setting terms counter');
            }
          });
        }
        console.log('Next term reset');
        return false;
      }
      item.counter += 1;
      item.isNext = false;        
      item.save();
      console.log(getITunesTermLink(item.name));
      getDataFromAppStore(getITunesTermLink(item.name));
      return item.name;
    });
  } catch(err) {
    // (new errors.ResourceNotFoundError(`There is no term found`));
    return false;
  }  
}

const getDataFromAppStore = (url) => {
  console.info('AXIOS - Making iTunes request');
    axios.get(url)
      .then(response => {
        console.info('AXIOS - Request successful');
        const appList = response.data.results;
        
        {appList && appList.map(item => {
          try {
            const checkApp = App.findOneAndUpdate({trackId: item.trackId }, item, { upsert: true }, (error, result) => {
              if (error) {
                const app = new App({
                  isGameCenterEnabled: item.isGameCenterEnabled,
                  screenshotUrls: item.screenshotUrls,
                  ipadScreenshotUrls: item.ipadScreenshotUrls,
                  appletvScreenshotUrls: item.appletvScreenshotUrls,
                  artworkUrl60: item.artworkUrl60,
                  artworkUrl512: item.artworkUrl512,
                  artworkUrl100: item.artworkUrl100,
                  artistViewUrl: item.artistViewUrl,
                  supportedDevices: item.supportedDevices,
                  advisories: item.advisories,
                  kind: item.kind,
                  features: item.features,
                  averageUserRatingForCurrentVersion: item.averageUserRatingForCurrentVersion,
                  trackCensoredName: item.trackCensoredName,
                  languageCodesISO2A: item.languageCodesISO2A,
                  fileSizeBytes: item.fileSizeBytes,
                  sellerUrl: item.sellerUrl,
                  contentAdvisoryRating: item.contentAdvisoryRating,
                  userRatingCountForCurrentVersion: item.userRatingCountForCurrentVersion,
                  trackViewUrl: item.trackViewUrl,
                  trackContentRating: item.trackContentRating,
                  releaseNotes: item.releaseNotes,
                  trackId: item.trackId,
                  trackName: item.trackName,
                  formattedPrice: item.formattedPrice,
                  sellerName: item.sellerName,
                  isVppDeviceBasedLicensingEnabled: item.isVppDeviceBasedLicensingEnabled,
                  primaryGenreId: item.primaryGenreId,
                  currency: item.currency,
                  wrapperType: item.wrapperType,
                  version: item.version,
                  releaseDate: item.releaseDate,
                  primaryGenreName: item.primaryGenreName,
                  genreIds: item.genreIds,
                  minimumOsVersion: item.minimumOsVersion,
                  artistId: item.artistId,
                  artistName: item.artistName,
                  genres: item.genres,
                  price: item.price,
                  description: item.description,
                  bundleId: item.bundleId,
                  currentVersionReleaseDate: item.currentVersionReleaseDate,
                  averageUserRating: item.averageUserRating,
                  userRatingCount: item.userRatingCount
                });
                
                if (!testMode) {
                  const newApp = app.save();
                }
                console.info('App added: ' + app.trackName);
              } else {
                console.info('App updated: ' + item.trackName);
              }
            });  
          } catch(err) {
            return new errors.InternalError(err.message);
          }

          {appList && appList.map(item => {
            try {
              const checkApp = AppSummary.findOneAndUpdate({trackId: item.trackId }, item, { upsert: true }, (error, result) => {
                if (error) {  
                  const appSummary = new AppSummary({
                    trackId: item.trackId,
                    trackName: item.trackName,
                    trackViewUrl: item.trackViewUrl,
                    trackContentRating: item.trackContentRating,
                    genres: item.genres,
                    price: item.price,
                    formattedPrice: item.formattedPrice,
                    description: item.description,
                    artworkUrl60: item.artworkUrl60,
                    artworkUrl512: item.artworkUrl512,
                    artworkUrl100: item.artworkUrl100,
                    version: item.version,
                    sellerName: item.sellerName,
                    sellerUrl: item.sellerUrl,
                    releaseDate: item.releaseDate,
                    userRatingCount: item.userRatingCount,
                    averageUserRating: item.averageUserRating,
                    currentVersionReleaseDate: item.currentVersionReleaseDate,
                    userRatingCountForCurrentVersion: item.userRatingCountForCurrentVersion,
                    averageUserRatingForCurrentVersion: item.averageUserRatingForCurrentVersion
                  });
                  
                  if (!testMode) {
                    const newAppSummary = appSummary.save();
                  }
                  console.info('AppSummary added: ' + app.trackName);
                } else {
                  console.info('AppSummary updated: ' + item.trackName);
                }
              });  
            } catch(err) {
              return new errors.InternalError(err.message);
            }
          })}
        })}
      })
      .catch(error => {
        console.log(error);
      });
}


module.exports = server => {
  server.get('/app', async (req, res, next) => {
    try {
      const appList = await App.find({});
      res.send(appList);
      next();  
    } catch(err) {
      return next(new errors.InvalidContentError(err));
    } 
  });
  server.get('/appsummary', async (req, res, next) => {
    try {
      const appList = await AppSummary.find({});
      res.send(appList);
      next();  
    } catch(err) {
      return next(new errors.InvalidContentError(err));
    } 
  });
  server.get('/app/count', async (req, res, next) => {
    try {
      const appList = await App.countDocuments({ });
      res.send(201);
      console.log('AppList Length: ' + appList);
      next();  
    } catch(err) {
      return next(new errors.InvalidContentError(err));
    } 
  });
  server.del('/app/all', async (req, res, next) => {
    try{
      const app = await App.deleteMany({ });
      res.send(204);
      next();
    } catch(err) {
      return next(new errors.ResourceNotFoundError(`There is no app with the id of ${req.params.id}`));
    }
  });
}