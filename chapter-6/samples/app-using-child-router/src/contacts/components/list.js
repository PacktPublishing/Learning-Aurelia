import {inject, computedFrom} from 'aurelia-framework';
import {ContactGateway} from '../services/gateway';
import {Contact} from '../models/contact';

@inject(ContactGateway)
export class ContactList {
  
  contacts = [];

  constructor(contactGateway) {
    this.contactGateway = contactGateway;
  }

  activate() {
    return this.contactGateway.getAll()
      .then(contacts => {
        this.contacts.splice(0);
        this.contacts.push.apply(this.contacts, contacts);
      });
  }
}
