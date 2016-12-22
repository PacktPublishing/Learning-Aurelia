import {inject, NewInstance} from 'aurelia-framework';
import {ValidationController} from 'aurelia-validation';
import {Router} from 'aurelia-router';
import {ContactStore} from '../services/store';
import {ContactGateway} from '../services/gateway';

@inject(ContactStore, ContactGateway, NewInstance.of(ValidationController), Router)
export class ContactEdition {

  constructor(store, gateway, validationController, router) {
    this.store = store;
    this.gateway = gateway;
    this.validationController = validationController;
    this.router = router;
  }

  activate(params, config) {
    return this.store.getById(params.id).then(contact => {
      this.contact = contact;
      config.navModel.setTitle(this.contact.fullName);
    });
  }

  save() {
    return this.validationController.validate().then(errors => {
      if (errors.length > 0) {
        return;
      }

      return this.gateway.update(this.contact.id, this.contact)
        .then(() => this.router.navigateToRoute('contact-details', { id: this.contact.id }));
    });
  }
}
