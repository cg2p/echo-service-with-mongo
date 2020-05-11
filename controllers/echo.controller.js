const echoService = require('../services/echo.service');

// ping
exports.ping = function (request, response) {
  response.send('ping!\n');
  console.log("/ ping fired");
};

// echo
// setEcho false to store as is
exports.echo = function (request, response) { 
  echoService.setEcho(request.body.uid, request.body.inputText, false)
      .then(function (echoes) {
        console.log("/ echo fired");
        response.send(echoes);
      })
      .catch(function (err) {
          console.log(err);
          response.status(500).send(err);
      });
};

// reverse
// setEcho true to store as reversed
exports.reverse = function (request, response) {
  echoService.setEcho(request.body.uid, request.body.inputText, true)
      .then(function (echoes) {
        console.log("/ reverse fired");
        response.send(echoes);
      })
      .catch(function (err) {
          console.log(err);
          response.status(500).send(err);
      });
};

// echoes
exports.echoes =  function (request, response) {
  echoService.getEchoes(request.body.uid)
      .then(function (echoes) {
        console.log("/ echoes fired");
        response.send(echoes);
      })
      .catch(function (err) {
          console.log(err);
          response.status(500).send(err);
      });
};
