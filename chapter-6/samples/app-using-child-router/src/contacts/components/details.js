import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {ContactGateway} from '../services/gateway';

@inject(ContactGateway, Router)
export class ContactDetails {

  constructor(contactGateway, router) {
    this.contactGateway = contactGateway;
    this.router = router;
  }

  activate(params, config) {
    return this.contactGateway.getById(params.id)
      .then(contact => {
        this.contact = contact;
        config.navModel.setTitle(this.contact.fullName);
      });
  }

  tryDelete() {
    if (confirm('Do you want to delete this contact?')) {
      this.contactGateway.delete(this.contact.id)
        .then(() => { this.router.navigateToRoute('contacts'); });
    }
  }
}
