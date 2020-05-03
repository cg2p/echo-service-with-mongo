// config.js
require('dotenv').config(); // this loads the defined variables from .env

const config = {
   // 'dev' or 'test'
  env: process.env.NODE_ENV,

  port: parseInt(process.env.SERVICE_PORT) || 3001,
  host: parseInt(process.env.SERVICE_HOST) || 'localhost',
  
  // cors
  cors_allow:  '*'
};

 

module.exports = config;