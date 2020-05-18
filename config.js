// config.js
require('dotenv').config(); // this loads the defined variables from .env

if (!process.env.NODE_ENV) {
  env = 'dev';
} else {
  env = process.env.NODE_ENV;
}
console.log("environment is %s", env);

// DEV
const dev = {
  // environment
  env: env,

  // db
  db: {
    host: process.env.DEV_DB_HOST || '127.0.0.1',
    port: process.env.DEV_DB_PORT || 27001,
    name: process.env.DEV_DB_NAME || 'echo'
  },

};

// PROD
const prod = {
  // environment
  env: env,

  // db
  db: {
    binding: process.env.BINDING,
    name: process.env.DB_NAME
  },

};

const config = {
  dev,
  prod
 };
 
module.exports = config[env];
