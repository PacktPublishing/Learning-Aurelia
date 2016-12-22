'use strict';

const path = require('path');
const PhotoRepository = require('../../infrastructure/photos/repository.js');
const ContactPhotoController = require('./controller.js');
const ContactPhotoUrlBuilder = require('./url-builder.js');

const filePath = path.join(process.cwd(), 'data/photos.json');
const photoDirectory = path.join(process.cwd(), 'data/photos');

exports.ContactPhotoUrlBuilder = ContactPhotoUrlBuilder;

exports.register = function(server, options, next) {
  const events = server.root.app.events;
  const webSocket = server.root.app.webSocket;

  const urlBuilder = new ContactPhotoUrlBuilder(options.baseUrl);
  const controller = new ContactPhotoController(new PhotoRepository(filePath, photoDirectory, events));
  controller.register(server);

  function emitEvent(e) {
    webSocket.emit('contact-photo.changed', {
      contactId: e.id,
      photoUrl: urlBuilder.getUrlFor(e.id)
    });
  }

  events.subscribe('contact-photo.created', e => {
    emitEvent(e);
    console.log('Photo for contact #' + e.id + ' created.');
  });
  events.subscribe('contact-photo.updated', e => {
    emitEvent(e);
    console.log('Photo for contact #' + e.id + ' updated.');
  });
  events.subscribe('contact-photo.deleted', e => {
    emitEvent(e);
    console.log('Photo for contact #' + e.id + ' deleted.');
  });
  
  console.log('Contacts-photo feature registered.')
  next();
};

exports.register.attributes = {
  name: 'contacts-photo-api'
};
