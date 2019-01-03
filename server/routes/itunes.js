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
    axios.get(url)
      .then(response => {
        console.info('AXIOS - iTunes Request successful');
        const appList = response.data.results;
        
        {appList && appList.map(item => {
          try {
            const checkApp = App.findOneAndUpdate({trackId: item.trackId }, item, { upsert: true }, (error, result) => {
              if (error) {
                return next(new errors.InternalError(error.message));
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
                  return next(new errors.InternalError(error.message));
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

    // GET - Single App Summary
  server.get('/app/:id', async (req, res, next) => {
    try {
      const appList = await App.findOne({ trackId: req.params.id});
      res.send(appList);
      next();  
    } catch(err) {
      return next(new errors.ResourceNotFoundError(`There is no term with the app of ${req.params.id}`));
    }        
  });
  server.get('/app/count', async (req, res, next) => {
    try {
      const appList = await App.countDocuments({ });
      res.send(201);
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