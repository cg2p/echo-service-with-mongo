// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const health = require('@cloudnative/health-connect');
let healthcheck = new health.HealthChecker();

const echo = require('./routes/echo.route');
const db = require('./utils/db');

var host = process.env.SERVICE_HOST || '0.0.0.0';
var port = process.env.SERVICE_PORT || 3001;

console.log("host: %s", host);
console.log("port: %s", port);

var version = process.env.VERSION;
var cors_allow = process.env.CORS_ALLOW || '*';
console.log("cors_allow: %s", cors_allow);

// try connection to mongo
try {
  db.connect();
} catch (err) {
  console.log("error connecting %s", err);
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
