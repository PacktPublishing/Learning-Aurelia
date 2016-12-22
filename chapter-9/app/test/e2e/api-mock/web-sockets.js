'use strict';

const createWebSocket = require('socket.io');

exports.register = function(server, options, next) {
  server.app.webSocket = createWebSocket(server.listener);

  server.app.webSocket.on('connection', socket => {
    console.log('client connected');

    socket.on('disconnect', () => {
      console.log('client disconnected');
    });
  });

  next();
};

exports.register.attributes = {
  name: 'web-sockets'
};
