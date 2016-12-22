'use strict';

const process = require('process');
const Hapi = require('hapi');
const Good = require('good');
const Inert = require('inert');
const EventAggregator = require('aurelia-event-aggregator').EventAggregator;

const server = new Hapi.Server({
  connections: {
    routes: {
      cors: true
    }
  }
});

const host = '127.0.0.1'
const port = parseInt(process.env.PORT) || 8000;

server.app.events = new EventAggregator();

server.connection({
  host: host,
  port: port
});

server.register([
  require('./web-sockets.js'),
  {
    register: require('./features/contacts'),
    options: {
      baseUrl: 'http://' + host + ':' + port
    }
  },
  {
    register: require('./features/contacts-photo'),
    options: {
      baseUrl: 'http://' + host + ':' + port
    }
  },
  {
    register: Good,
    options: {
      reporters: [{
        reporter: require('good-console'),
        events: {
          response: '*',
          log: '*'
        }
      }]
    }
  },
  {
    register: Inert
  }
], (err) => {
  if (err) {
    throw err;
  }
  
  server.start(() => {
    console.log('Server running at:', server.info.uri);
  });
});
