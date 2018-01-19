var express = require('express');
var app = express();
var filesize = require('./filesize.js');
var bodyparser = require('body-parser')

app.use(bodyparser.json());

app.use(express.static('public'));

app.get('/',function(req,res){
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/upload/file',filesize);

app.use(function(req,res){
  console.log("Server Cant Handle the Request to "+ req.url);
  res.send("Bad route. Check the URL ...");
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


