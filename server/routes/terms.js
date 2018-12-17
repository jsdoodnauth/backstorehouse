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

  // Add Term
  server.post('/terms', async (req, res, next) => {
    // Check for JSON
    if(!req.is('application/json')) {
      return next(new errors.InvalidContentError("Expected 'application/json'"));
    }

    try {
      const term = await Term.findOneAndUpdate({name: req.body.name }, req.body, { upsert: true }, async (error, result) => {
        if (error) {
          const { name } = req.body;
          const term = new Term({
            name
          });

          try {
            const newTerm = await term.save();
            res.send(201);
            next();
          } catch(err) {
            return next(new errors.InternalError(err.message));
          }
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
          const { name } = req.body;
          const term = new Term({
            name
          });

          try {
            const newTerm = await term.save();
            res.send(201);
            next();
          } catch(err) {
            return next(new errors.InternalError(err.message));
          }
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
      const term = await Term.findOneAndRemove({ name: req.body.name });
      res.send(204);
      next();
    } catch(err) {
      return next(new errors.ResourceNotFoundError(`There is no term with the id of ${req.params.id}`));
    } 
  });
}