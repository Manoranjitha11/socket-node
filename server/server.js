const path = require('path');
const express = require('express');
const http = require('http');
var app = express();
var socketIO = require('socket.io');
var server = http.createServer(app);
var io = socketIO(server);
const publicpath = path.join(__dirname, '../public');
//console.log(publicpath);
io.on('connection', (socket) => {
  console.log("New user connected");
  socket.emit('newMail', {
    name: 'Manoranjitha',
    address : 'salem'
  })
  socket.on('createMail', (data) => {
console.log('From clientVersion', data);
  })
  socket.on('disconnect' , () => {
    console.log("Disconnected from client");
  })
})
var port = process.env.PORT || 3000;
app.use(express.static(publicpath));
server.listen(port);
