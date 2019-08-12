//ping
exports.ping = function (req, res) {
    res.send('ping!');
    console.log("/ ping fired");
  };

//echo
exports.echo = function (req, res) {
  const txt = req.body.echoText;
  res.json({
    echoResponse: txt 
  });
  console.log("/echo fired with %s", txt);
};

