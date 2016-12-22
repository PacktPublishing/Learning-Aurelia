'use strict';

const Promise = require("bluebird");
const objectAssign = require('object-assign');
const FileStore = require('../file-store');

function parseTerms(search) {
  return search
    .split(' ')
    .filter(t => t !== '')
    .map(t => t.toLowerCase());
}

function matchesTerms(contact, terms) {
  return terms.some(t => matchesTerm(contact, t));
}

function matchesTerm(contact, term) {
  return containsTerm(contact.firstName, term)
    || containsTerm(contact.lastName, term)
    || containsTerm(contact.company, term);
}

function containsTerm(value, term) {
  return value && value.toLowerCase().includes(term);
}

module.exports = class ContactRepository {

  constructor(filePath, events) {
    this._store = new FileStore(filePath, {
      nextId: 1,
      contacts: []
    });
    this._events = events;
  }

  getAll() {
    return this._store.data
      .then(d => d.contacts);
  }

  findAll(search) {
    const terms = parseTerms(search);
    return this.getAll()
      .then(contacts => contacts.filter(c => matchesTerms(c, terms)));
  }

  getById(id) {
    return this._store.data
      .then(d => d.contacts.find(c => c.id === id) || Promise.reject());
  }

  create(contact) {
    return this._store.data.then(d => {
      contact.id = d.nextId++;
      contact.createdAt = contact.modifiedAt = new Date().toISOString();
      d.contacts.push(contact);
      return this._store.save();
    })
      .then(() => { this._events.publish('contact.created', { contact }) })
      .then(() => contact);
  }

  update(updatedContact) {
    return this._store.data.then(d => {
      var index = d.contacts.findIndex(c => c.id === updatedContact.id);
      if (index < 0) {
        return Promise.reject();
      }

      let contact = d.contacts[index];
      objectAssign(contact, updatedContact);
      contact.modifiedAt = new Date().toISOString();
      return this._store.save()
        .then(() => { this._events.publish('contact.updated', { contact }) })
        .then(() => contact);
    });
  }

  removeById(id) {
    return this._store.data.then(d => {
      var index = d.contacts.findIndex(c => c.id === id);
      if (index < 0) {
        return Promise.reject();
      }

      const contact = d.contacts[index];
      d.contacts.splice(index, 1);
      return this._store.save()
        .then(() => { this._events.publish('contact.deleted', { contact }) });
    });
  }
}
