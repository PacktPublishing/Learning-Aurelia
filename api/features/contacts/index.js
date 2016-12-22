'use strict';

const process = require('process');
const path = require('path');

const ContactRepository = require('../../infrastructure/contacts/repository.js');
const PhotoUrlProvider = require('../contacts-photo').ContactPhotoUrlBuilder;
const ContactController = require('./controller.js');

const filePath = path.join(process.cwd(), 'data/contacts.json');

exports.register = function(server, options, next) {
  const events = server.root.app.events;
  const webSocket = server.root.app.webSocket;

  const repository = new ContactRepository(filePath, events);
  const photoUrlProvider = new PhotoUrlProvider(options.baseUrl);
  const controller = new ContactController(repository, photoUrlProvider);
  controller.register(server);

  webSocket.on('connection', socket => {
    repository.getAll().then(contacts => {
      contacts = contacts.map(c => controller.addPhotoUrlTo(c));
      socket.emit('contacts.loaded', { contacts });
    });
  });
  
  events.subscribe('contact.created', e => {
    const contact = controller.addPhotoUrlTo(e.contact);
    webSocket.emit('contact.created', { contact });
    console.log('Contact #' + contact.id + ' created.');
  });
  events.subscribe('contact.updated', e => {
    const contact = controller.addPhotoUrlTo(e.contact);
    webSocket.emit('contact.updated', { contact });
    console.log('Contact #' + contact.id + ' updated.');
  });
  events.subscribe('contact.deleted', e => {
    const contact = controller.addPhotoUrlTo(e.contact);
    webSocket.emit('contact.deleted', { contact });
    console.log('Contact #' + contact.id + ' deleted.');
  });

  console.log('Contacts feature registered.')
  next();
};

exports.register.attributes = {
  name: 'contacts-api'
};
