const errors = require('restify-errors');
const axios = require('axios');
const schedule = require('node-schedule');
const itunes = require('../requests/itunes');
const App = require('../models/Apps');
const testMode = true;
let arr = ['a', 'b', 'c'];
let i = 0;

// const job = schedule.scheduleJob('*/5 * * * * *', () => {
//   console.log(arr[i] + 'CRON JOB: ' + new Date());
//   getDataFromAppStore();
//   i++;
//   if (i >= arr.length) i = 0;
// });

const getDataFromAppStore = () => {
  console.info('AXIOS - Making iTunes request');
    axios.get(itunes())
      .then(response => {
        console.info('AXIOS - Request successful');
        const appList = response.data.results;
        
        {appList && appList.map(item => {          
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

          console.info('App stored: ' + app.trackName);          

          try {
            if (!testMode) {
              const newApp = app.save();
            }
            res.send(201);
            return;
          } catch(err) {
            return new errors.InternalError(err.message);
          }
        })}
      })
      .catch(error => {
        console.log(error);
      });
}


module.exports = server => {
  server.get('/itunes', async (req, res, next) => {
    return(next(getDataFromAppStore()));
  });
}