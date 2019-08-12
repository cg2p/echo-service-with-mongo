// config.js
require('dotenv').config(); // this loads the defined variables from .env

const env = process.env.NODE_ENV; // 'dev' or 'test'

const dev = {
 app: {
   port: parseInt(process.env.DEV_APP_PORT) || 3001,
   host: parseInt(process.env.DEV_APP_HOST) || 'localhost',
   cors_allow:  '*'
 }
};
const test = {
 app: {
   port: parseInt(process.env.TEST_APP_PORT) || 3001,
   host: parseInt(process.env.TEST_APP_HOST) || 'localhost',
   cors_allow:  'http://localhost:3000'
 }
};

 
const config = {
 dev,
 test
};

module.exports = config[env];