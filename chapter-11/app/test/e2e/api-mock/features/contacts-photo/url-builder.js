'use strict';

const url = require('url');
const ContactPhotoController = require('./controller.js');

function ContactPhotoUrlBuilder(baseUrl) {
  this.baseUrl = baseUrl;
}

ContactPhotoUrlBuilder.prototype.getUrlFor = function(id) {
  const path = ContactPhotoController.getPathFor(id);
  return url.resolve(this.baseUrl, path);
}

module.exports = ContactPhotoUrlBuilder;
