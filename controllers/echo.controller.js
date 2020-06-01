const echoService = require('../services/echo.service');

// ping
exports.ping = function (request, response) {
  response.json({outputText: 'ping!'});
  console.log("/ ping fired");
};

// echo
// setEcho false to store as is
exports.echo = async function (request, response) { 

  try {
    let echo = await echoService.setEcho(request.body.uid, request.body.inputText, false); 
    console.log("success echoService.setEcho echo");
    console.log(echo);
    response.json({ result: echo });
  } catch (err) {
    console.log(err);
    response.status(500).send(err);
  }

/*
  echoService.setEcho(request.body.uid, request.body.inputText, false)
      .then(function (echoes) {
        console.log("/ echo fired");
        response.send(echoes);
      })
      .catch(function (err) {
          console.log(err);
          response.status(500).send(err);
      });*/
};

// reverse
// setEcho true to store as reversed
exports.reverse = async function (request, response) {
  try {
    let echo = await echoService.setEcho(request.body.uid, request.body.inputText, true); 
    console.log("success echoService.setEcho reverse");
    console.log(echo);
    response.json({ result: echo });
  } catch (err) {
    console.log(err);
    response.status(500).send(err);
  }

/*  echoService.setEcho(request.body.uid, request.body.inputText, true)
      .then(function (echoes) {
        console.log("/ reverse fired");
        response.send(echoes);
      })
      .catch(function (err) {
          console.log(err);
          response.status(500).send(err);
      });*/
};

// echoes
exports.echoes = async function (request, response) {

  try {
    let echoes = await echoService.getEchoes(request.body.uid); 
    console.log("success echoService.getEchoes");
    console.log(echoes);
    response.json({ result: echoes });
  } catch (err) {
    console.log(err);
    response.status(500).send(err);
  }

/*

  echoService.getEchoes(request.body.uid)
      .then(function (echoes) {
        console.log("/ echoes fired");
        response.send(echoes);
      })
      .catch(function (err) {
          console.log(err);
          response.status(500).send(err);
      });*/
};
