// server.js
const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");

const health = require('@cloudnative/health-connect');
let healthcheck = new health.HealthChecker();

const config = require('./config');

const echo = require("./routes/echo.route");

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
  origin: config.app.cors_allow,
  credentials: true
}));

// Routes
server.use('/', echo);
server.use('/live', health.LivenessEndpoint(healthcheck));
server.use('/ready', health.ReadinessEndpoint(healthcheck));
server.use('/health', health.HealthEndpoint(healthcheck));
//server.use('/metrics', require('appmetrics-prometheus').endpoint());

server.listen(config.app.port, config.app.host, (err) => {
    if (err) {
      return console.log('something bad happened', err)
    }
  
    console.log('Build version: %s', process.env.version);
    console.log('Server ready on %s %s', config.app.host, config.app.port);
  })
