//ping
exports.ping = function (req, res) {
  res.send('ping!\n');
  console.log("/ ping fired");
};

//echo
exports.echo = function (req, res) {
const txt = req.body.inputText;
res.json({
  outputText: txt 
});
console.log("/echo fired with %s", txt);
};

//reverse
exports.reverse = function (req, res) {
  var txt = req.body.inputText;
  var rev = txt.split("").reverse().join("");
  res.json({
    outputText: rev 
  });
  console.log("/reverse fired returning %s", rev);
  };