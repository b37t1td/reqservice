var express = require('express');
var accepts = require('accepts');
var parser = require('ua-parser-js');

var app = express();
var port = process.env.PORT || 8081;

var getClientAddress = function (req) {
        return (req.headers['x-forwarded-for'] || '').split(',')[0]
        || req.connection.remoteAddress;
};

var service = function(req) {
  var ua = parser(req.headers['user-agent']);
  var ip = getClientAddress(req);
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
