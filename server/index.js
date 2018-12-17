const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');

const server = restify.createServer();

server.get('/*', restify.plugins.serveStatic({
  directory: './client/build',
  default: 'index.html'
}));

// Middleware - CORS
server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);

// Middleware - Mongoose
server.use(restify.plugins.bodyParser());
server.listen(config.PORT, () => {
  mongoose.set('useFindAndModify', false);
  mongoose.connect(
    config.MONGODB_URI, 
    { useNewUrlParser: true }
  );
});

const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => {
  require('./routes/terms')(server);
  require('./routes/itunes')(server);
  require('./routes/customers')(server);
  require('./routes/posts')(server);
  console.log(`server started on port ${config.PORT}`)
})
