//ping
exports.ping = function (req, res) {
  res.send('ping!\n');
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

//reverse
exports.reverse = function (req, res) {
  var txt = req.body.reverseInput;
  var rev = txt.split("").reverse().join("");
  res.json({
    reverseOutput: rev 
  });
  console.log("/reverse fired returning %s", rev);
  };