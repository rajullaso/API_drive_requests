const express = require('express');
const app = express();
var http = require('http').Server(app);
var bodyParser = require("body-parser");
var https = require('https');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.get('/index', function(req, res) {
        res.sendFile(__dirname + '/index.html');
    });

app.get('/calendar', function(req, res) {
        res.sendFile(__dirname + '/calendar.html');
    });

app.get('/register', function(req, res) {
        res.sendFile(__dirname + '/register.html');
    });

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

http.listen(3000, () => {
  console.log('server started');
});