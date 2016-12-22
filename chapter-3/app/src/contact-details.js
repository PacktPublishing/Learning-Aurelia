import {inject} from 'aurelia-framework';
import {ContactGateway} from './contact-gateway';

@inject(ContactGateway)
export class ContactDetails {

  constructor(contactGateway) {
    this.contactGateway = contactGateway;
  }

  activate(params, config) {
    return this.contactGateway.getById(params.id)
      .then(contact => {
        this.contact = contact;
        config.navModel.setTitle(contact.fullName);
      });
  }
}
