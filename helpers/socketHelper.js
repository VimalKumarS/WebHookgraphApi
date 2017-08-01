
var http =require('http');
var io = require('socket.io');
var express = require('express');
var socketServer = http.createServer(express);

 var ioServer = io(socketServer);

socketServer.listen(3001);

// Socket event
ioServer.on('connection', socket => {
  socket.on('create_room', subscriptionId => {
    socket.join(subscriptionId);
  });
});
module.exports ={
  ioServer:ioServer
}