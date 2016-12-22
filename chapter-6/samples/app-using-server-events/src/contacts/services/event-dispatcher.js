import {inject} from 'aurelia-framework';
import io from 'socket.io-client';
import environment from 'environment';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Contact} from '../models/contact';

@inject(EventAggregator)
export class ContactEventDispatcher {

  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
  }

  activate() {
    if (!this.connection) {
      this.connection = io(environment.contactsUrl);

      this.connecting = new Promise(resolve => {
        this.connection.on('contacts.loaded', e => {
          this.eventAggregator.publish('contacts.loaded', {
            contacts: e.contacts.map(Contact.fromObject)
          });
          resolve();
        });
      });
      
      this.connection.on('contact.created', e => {
        this.eventAggregator.publish('contact.created', {
          contact: Contact.fromObject(e.contact)
        });
      });
      this.connection.on('contact.updated', e => {
        this.eventAggregator.publish('contact.updated', {
          contact: Contact.fromObject(e.contact)
        });
      });
      this.connection.on('contact.deleted', e => {
        this.eventAggregator.publish('contact.deleted', {
          contact: Contact.fromObject(e.contact)
        });
      });
    }

    return this.connecting;
  }

  deactivate() {
    this.connection.close();
    this.connection = null;
    this.connecting = null;
  }
}
