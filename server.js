// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

// Then we'll pull in the database client library
//const MongoClient = require("mongodb").MongoClient;


// useful utils
//const util = require('util')
//const assert = require('assert');


const health = require('@cloudnative/health-connect');
let healthcheck = new health.HealthChecker();

const config = require('./config');
const echo = require("./routes/echo.route");

var host = config.host;
var port = config.port;
var version = config.version;
var cors_allow = config.cors_allow;
var dbname = config.db.name;

var connectionString;

if (config.env == 'dev') {

  let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName = dbname
  };

  connectionString = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;
  console.log("connection string %s", connectionString);
  
  //mongoose.set('useNewUrlParser', true);
  mongoose.connect(connectionString, options)
      .then(() => console.log("successfully connected to mongodb"))
      .catch(err => console.log("error connecting"))

  } else if (config.env = 'prod') {
  //  
  if (config.db.binding) {
    credentials = JSON.parse(config.db.binding);

    // We now take the first bound MongoDB service and extract its credentials object from BINDING
    let mongodbConn = credentials.connection.mongodb;

    // Read the CA certificate and assign that to the CA variable
    let ca = [Buffer.from(mongodbConn.certificate.certificate_base64, 'base64')];

    // We always want to make a validated TLS/SSL connection
    let options = {
        ssl: true,
        sslValidate: true,
        sslCA: ca,
        useUnifiedTopology: true,
        dbName = dbname
      };

    // Extract the database username and password
    let authentication = mongodbConn.authentication;
    let username = authentication.username;
    let password = authentication.password;

    // Extract the MongoDB URIs
    let connectionPath = mongodbConn.hosts;
    let connectionString = `mongodb://${username}:${password}@${connectionPath[0].hostname}:${connectionPath[0].port},${connectionPath[1].hostname}:${connectionPath[1].port}/?replicaSet=replset`;
    console.log("connection string %s", connectionString);
  
    mongoose.set('useNewUrlParser', true);
    mongoose.connect(connectionString, options)
        .then(() => console.log("successfully connected to mongodb"))
        .catch(err => console.log("error connecting")) 
  } 
} else {
  if (!process.env.BINDING) {
    console.error('ENVIRONMENT variable "BINDING" is not set - exit(1)');
    process.exit(1);
   } else {
    console.error('environment not set - exit(1)');
    process.exit(1);

   }
}

// set-up server
const server = express();

// Bodyparser middleware
server.use(
  bodyParser.urlencoded({
    extended: false
  })
);
server.use(bodyParser.json());

// CORS accept
server.use(cors({
  origin: cors_allow,
  credentials: true
}));

// Routes
server.use('/', echo);
server.use('/live', health.LivenessEndpoint(healthcheck));
server.use('/ready', health.ReadinessEndpoint(healthcheck));
server.use('/health', health.HealthEndpoint(healthcheck));
//server.use('/metrics', require('appmetrics-prometheus').endpoint());

server.listen(port, host, (err) => {
    if (err) {
      return console.log('something bad happened', err)
    }
  
    console.log('Build version: %s', version);
    console.log('Server ready on %s %s', host, port);
  })
