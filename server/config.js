module.exports = {
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3001,
  URL: process.env.BASE_URL || 'http://localhost:3001',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://joshua:joshua1!@127.0.0.1:27017/customer_api'
};
