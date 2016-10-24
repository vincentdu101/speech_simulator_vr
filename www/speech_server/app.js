var express = require('express');
var BinaryServer = require('binaryjs').BinaryServer;
var fs = require('fs');
var wav = require('wav');
var cors = require("cors");
var bodyParser = require("body-parser");
var recognizer = require("./recognizer");

var port = 3700;
var outFile = 'demo.wav';
var app = express();

// app.set('views', __dirname + '/tpl');
// app.set('view engine', 'jade');
// app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/public'))
app.use(cors());
app.use(bodyParser.json());
app.get('/', function(req, res){
  // res.render('index');
});

app.post("/audio", function(req, res){
    recognizer.recognize(req.body.audio);
});

app.listen(port);

console.log('server open on port ' + port);

