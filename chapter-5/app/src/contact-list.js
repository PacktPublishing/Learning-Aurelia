import {inject, computedFrom} from 'aurelia-framework';
import {ContactGateway} from './contact-gateway';

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
