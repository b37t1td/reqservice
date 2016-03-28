var express = require('express');
var getIP = require('ipware')().get_ip;
var accepts = require('accepts');
var parser = require('ua-parser-js');

var app = express();
var port = process.env.PORT || 8081;


var service = function(req) {
  var ua = parser(req.headers['user-agent']);
  var ip = getIP(req).clientIp;
  var lang = accepts(req).languages()[0] || 'None'
  var device = ua.browser.name +'/'+ ua.os.name

  return {
    ipaddress : ip,
    language: lang,
    software: device
  }
}


app.use('*', function(req, res) {
  res.header('Content-type', 'application/json');
  res.send(service(req));
});

app.listen(port, function() {
  console.log('Application started on :' + port);
});
