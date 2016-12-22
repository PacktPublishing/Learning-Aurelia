'use strict';

const Joi = require('joi');
const validation = require('./validation.js');

function ContactController(repository, photoUrlProvider) {
  this.repository = repository;
  this.photoUrlProvider = photoUrlProvider;
}

ContactController.prototype.addPhotoUrlTo = function(contact) {
  contact.photoUrl = this.photoUrlProvider.getUrlFor(contact.id);
  return contact;
};

ContactController.prototype.removePhotoUrlFrom = function(contact) {
  delete contact.photoUrl;
  return contact;
}

ContactController.prototype.getAll = function(request, reply) {
  const search = (request.query.search || '').trim();
  const contacts = search
    ? this.repository.findAll(search)
    : this.repository.getAll();
  const dto = contacts
    .then(contacts => contacts.map(c => this.addPhotoUrlTo(c)))
  return reply(contacts).type('application/json');
};

ContactController.prototype.getById = function(request, reply) {
  const id = parseInt(request.params.id);
  const result = this.repository.getById(id)
    .then(c => this.addPhotoUrlTo(c))
    .catch(err => {
      if (err) {
        throw err;
      }
      return request.generateResponse('Contact not found').code(404);
    });
  
  return reply(result).type('application/json');
};

ContactController.prototype.create = function(request, reply) {
  const result = this.repository.create(this.removePhotoUrlFrom(request.payload))
    .then(contact => request.generateResponse().created('/contacts/' + contact.id));
  return reply(result);
};

ContactController.prototype.update = function(request, reply) {
  const id = parseInt(request.params.id);
  const contact = Object.assign({}, this.removePhotoUrlFrom(request.payload), { id: id });
  const result = this.repository.update(contact)
    .then(c => this.addPhotoUrlTo(c))
    .catch(err => {
      if (err) {
        throw err;
      }
      return request.generateResponse('Contact not found').code(404);
    });
  return reply(result).type('application/json');
};

ContactController.prototype.remove = function(request, reply) {
  const id = parseInt(request.params.id);
  const result = this.repository.removeById(id)
    .catch(err => {
      if (err) {
        throw err;
      }
      return request.generateResponse('Contact not found').code(404);
    });
  return reply(result);
};

ContactController.prototype.register = function(server) {
  server.route([
    {
      method: 'GET',
      path: '/contacts',
      handler: this.getAll.bind(this)
    }, {
      method: 'GET',
      path: '/contacts/{id}',
      config: {
        validate: {
          params: {
            id: Joi.number().integer().required()
          }
        }
      },
      handler: this.getById.bind(this)
    }, {
      method: 'POST',
      path: '/contacts',
      config: {
        payload: {
          output: 'data',
          parse: true
        },
        validate: {
          payload: validation.contact.required()
        }
      },
      handler: this.create.bind(this)
    }, {
      method: 'PUT',
      path: '/contacts/{id}',
      config: {
        payload: {
          output: 'data',
          parse: true
        },
        validate: {
          params: {
            id: Joi.number().integer().required()
          },
          payload: validation.contact.required()
        }
      },
      handler: this.update.bind(this)
    }, {
      method: 'DELETE',
      path: '/contacts/{id}',
      config: {
        validate: {
          params: {
            id: Joi.number().integer()
          }
        }
      },
      handler: this.remove.bind(this)
    }
  ]);
};

module.exports = ContactController;
