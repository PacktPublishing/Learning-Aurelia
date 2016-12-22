import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {ContactStore} from '../services/store';
import {ContactGateway} from '../services/gateway';

@inject(ContactStore, ContactGateway, Router)
export class ContactDetails {

  constructor(store, gateway, router) {
    this.store = store;
    this.gateway = gateway;
    this.router = router;
  }

  activate(params, config) {
    return this.store.getById(params.id)
      .then(contact => {
        this.contact = contact;
        config.navModel.setTitle(this.contact.fullName);
      });
  }

  tryDelete() {
    if (confirm('Do you want to delete this contact?')) {
      this.gateway.delete(this.contact.id)
        .then(() => { this.router.navigateToRoute('contacts'); });
    }
  }
}
