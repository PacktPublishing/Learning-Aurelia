import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {ContactGateway} from '../services/gateway';

@inject(ContactGateway, Router)
export class ContactsByAddress {
  
  contacts = [];

  constructor(contactGateway, router) {
    this.contactGateway = contactGateway;
    this.router = router;
  }

  activate() {
    return this.contactGateway.getAll().then(contacts => {
      this.contacts.splice(0);
      this.contacts.push.apply(this.contacts, contacts);
    });
  }

  navigateToDetails(contact) {
    this.router.navigateToRoute('contact-details', { id: contact.id });
  }
}
