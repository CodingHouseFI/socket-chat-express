'use strict';
var socket = io.connect('http://localhost:3000');


$(function() {
  $('#send').click(sendMessage);
});

function sendMessage() {
  var $message = $('#message');
  var $name = $('#name');

  var name = $name.val();
  var message = $message.val();
  $message.val('');

  socket.emit('newMessage', {
    text: message,
    name: name
  });
}

socket.on('history', function(history) {
  var $messages = history.map(function(message) {
    var text = `${message.name} - ${message.text}`;
    var $li = $('<li>').text(text);
    return $li;
  });
  $('#messages').append($messages);
});


socket.on('message', function(message) {
  var text = `${message.name} - ${message.text}`;
  var $message = $('<li>').text(text);
  $('#messages').append($message);
});

