const errors = require('restify-errors');
const Term = require('../models/Terms');

module.exports = server => {
  server.get('/terms', async (req, res, next) => {
    try {
      const terms = await Term.find({});
      res.send(terms);
      next();  
    } catch(err) {
      return next(new errors.InvalidContentError(err));
    }        
  });

  // GET - Single Term
  server.get('/terms/:id', async (req, res, next) => {
    try {
      const term = await Term.findById(req.params.id);
      res.send(term);
      next();  
    } catch(err) {
      return next(new errors.ResourceNotFoundError(`There is no term with the id of ${req.params.id}`));
    }        
  });

    // GET - Next Term
    server.get('/terms/next', (req, res, next) => {
      try {
        const term = Term.findOne({isNext: true}, async (error, term) => {
          if (error) {
            console.log(`Error in terms: ${error}`);
            next();
          }
          
          if (!term) {
            // const updateTerms = await Term.find({isNext: false}).updateMany({$set: {isNext: true}});
            // const updateTermsCounter = await Term.find({counter: 0}).updateMany({$set: {isNext: true}});
          } else {
            term.counter += 1;
            term.isNext = false;
            term.save();  
          }
          res.send(term);
          next();  
        });
      } catch(err) {
        return next(new errors.ResourceNotFoundError(`There is no term found`));
      }          
    });

  // Add Term
  server.post('/terms', (req, res, next) => {
    // Check for JSON
    if(!req.is('application/json')) {
      return next(new errors.InvalidContentError("Expected 'application/json'"));
    }

    try {
      const term = Term.find({name: req.body.name }, (error, result) => {
        if (result.length) {
          res.send(200);
          return next(); 
        }
        
        if (error) {
          return next(new errors.InternalError(error.message));
        }

        const { name } = req.body;
        const term = new Term({
          name,
          counter: 0,
          isNext: true,
          isActive: true
        });

        try {
          const newTerm = term.save();
          res.send(201);
          next();
        } catch(err) {
          return next(new errors.InternalError(err.message));
        }

      });
      res.send(200);
      next();
    } catch(err) {
      return next(new errors.ResourceNotFoundError(`There is no term with the id of ${req.params.id}`));
    }  
  });


  // UPDATE - Term
  server.put('/terms/:id', async (req, res, next) => {
    // Check for JSON
    if(!req.is('application/json')) {
      return next(new errors.InvalidContentError("Expected 'application/json'"));
    }

    try {
      const term = await Term.findOneAndUpdate({_id: req.params.id }, req.body, { upsert: true }, async (error, result) => {
        if (error) {
          return next(new errors.InternalError(error.message));
        }
      });
      res.send(200);
      next();
    } catch(err) {
      return next(new errors.ResourceNotFoundError(`There is no term with the id of ${req.params.id}`));
    }  
  });

  // DELETE - Term
  server.del('/terms/:id', async (req, res, next) => {
    try{
      const term = await Term.findOneAndRemove({ _id: req.params.id });
      res.send(204);
      next();
    } catch(err) {
      return next(new errors.ResourceNotFoundError(`There is no term with the id of ${req.params.id}`));
    } 
  });
}