'use strict';

const Promise = require("bluebird");
const path = require('path');
const process = require('process');
const Hapi = require('hapi');
const Good = require('good');
const Inert = require('inert');
const EventAggregator = require('aurelia-event-aggregator').EventAggregator;
const rimraf = require('rimraf');
const ncp = require('ncp').ncp

const dataDir = path.join(__dirname, 'data');
const initialDataDir = path.join(__dirname, 'initial-data');

function resetInitialData() {
  return new Promise((resolve, reject) => {
    rimraf(dataDir, (err) => {
      if (err) {
        reject(err);
        return;
      }
      
      console.log('Data directory deleted.');

      ncp(initialDataDir, dataDir, (err) => {
        console.log('Data directory reinitialized.');

        if (err) {
          reject(err);
        } else {
          resolve();
        }        
      });
    });
  });
}

const server = new Hapi.Server({
  connections: {
    routes: {
      cors: true
    }
  }
});

const host = '127.0.0.1';
const port = parseInt(process.env.PORT) || 8000;

server.app.events = new EventAggregator();

server.connection({
  host: host,
  port: port
});

server.route({
  method: 'POST',
  path: '/reset',
  handler: (request, reply) => {
    server.app.events.publish('resetting');
    
    return resetInitialData()
      .then(() => reply().code(200))
      .catch(err => reply(err).code(500));
  }
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
