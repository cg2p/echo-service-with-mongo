// server.js
const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");

const health = require('@cloudnative/health-connect');
let healthcheck = new health.HealthChecker();

const config = require('./config');
const echo = require("./routes/echo.route");

const server = express();

//var host = config.host;
//var port = config.port;
var host = '0.0.0.0';
var port = 3000;

var cors_allow = config.cors_allow;

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
  
    console.log('Build version: %s', process.env.version);
    console.log('Server ready on %s %s', host, port);
  })
