// config.js
require('dotenv').config(); // this loads the defined variables from .env

const env = process.env.NODE_ENV; // 'dev' or 'prod'
console.log("environment is %s", env);

// DEV
const dev = {
  // environment
  env: process.env.NODE_ENV,
  version: process.env.VERSION,
  port: parseInt(process.env.SERVICE_PORT) || 3000,
  host: parseInt(process.env.SERVICE_HOST) || '0.0.0.0',
  
  // cors
  cors_allow:  '*',

  // db
  db: {
    host: process.env.DEV_DB_HOST,
    port: parseInt(process.env.DEV_DB_PORT),
    name: process.env.DEV_DB_NAME
  },

};

// PROD
const prod = {
  // environment
  env: process.env.NODE_ENV,
  version: process.env.VERSION,
  port: parseInt(process.env.SERVICE_PORT) || 3000,
  host: parseInt(process.env.SERVICE_HOST) || '0.0.0.0',
  
  // cors
  cors_allow:  '*',

  // db
  db: {
    binding: process.env.BINDING
  },

};

const config = {
  dev,
  prod
 };
 
module.exports = config[env];
