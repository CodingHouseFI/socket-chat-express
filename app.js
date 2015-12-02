'use strict';

var PORT = process.env.PORT || 3000;

var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();
var server = http.Server(app);
var io = require('socket.io')(server);

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());
app.use(express.static('public'));


app.get('/', function (req, res) {
  res.render('index');
});

var history = [];

io.on('connection', function(socket) {
  socket.emit('history', history);

  socket.on('newMessage', function(message) {
    history.push(message);
    io.emit('message', message);
  });
});

server.listen(PORT);
