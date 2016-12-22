'use strict';

const path = require('path');
const Joi = require('joi');

const defaultPhoto = {
  path: path.join(process.cwd(), 'resources/nophoto.png'),
  type: 'image/png'
};
const allowedPhotoTypes = [
  'image/jpeg',
  'image/png',
  'image/gif'
];


function ContactPhotoController(repository) {
  this.repository = repository;
}

ContactPhotoController.getPathFor = function(id) {
  return '/contacts/' + id + '/photo';
};

ContactPhotoController.prototype.get = function(request, reply) {
  const id = parseInt(request.params.id);

  return this.repository.get(id)
    .then(photo => reply(photo.open()).type(photo.type))
    .catch(err => {
      if (err) {
        throw err;
      }
      return reply.file(defaultPhoto.path).type(defaultPhoto.type);
    });
};

ContactPhotoController.prototype.set = function(request, reply) {
  const id = parseInt(request.params.id);

  if (allowedPhotoTypes.indexOf(request.mime) < 0) {
    return reply('unsupported content type').code(415);
  }

  return this.repository.set(id, request.payload, request.mime)
    .then(() => reply().code(204));
};

ContactPhotoController.prototype.remove = function(request, reply) {
  const id = parseInt(request.params.id);

  return this.repository.remove(id)
    .then(() => { reply().code(204); })
    .catch(err => {
      if (err) {
        throw err;
      }
      return request.generateResponse('Photo not found').code(404);
    });
};

ContactPhotoController.prototype.register = function(server) {
  server.route([
    {
      method: 'GET',
      path: '/contacts/{id}/photo',
      config: {
        validate: {
          params: {
            id: Joi.number().integer().required()
          }
        }
      },
      handler: this.get.bind(this)
    }, {
      method: 'PUT',
      path: '/contacts/{id}/photo',
      config: {
        validate: {
          params: {
            id: Joi.number().integer().required()
          }
        },
        payload: {
          maxBytes: 2097152,
          output:'stream',
          parse: true
        },
        handler: this.set.bind(this)
      }
    }, {
      method: 'DELETE',
      path: '/contacts/{id}/photo',
      config: {
        validate: {
          params: {
            id: Joi.number().integer().required()
          }
        }
      },
      handler: this.remove.bind(this)
    }
  ]);
};

module.exports = ContactPhotoController;
