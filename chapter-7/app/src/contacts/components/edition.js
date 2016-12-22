import {inject, NewInstance} from 'aurelia-framework';
import {ValidationController} from 'aurelia-validation';
import {Router} from 'aurelia-router';
import {ContactGateway} from '../services/gateway';

@inject(ContactGateway, NewInstance.of(ValidationController), Router)
export class ContactEdition {

  constructor(contactGateway, validationController, router) {
    this.contactGateway = contactGateway;
    this.validationController = validationController;
    this.router = router;
  }

  activate(params, config) {
    return this.contactGateway.getById(params.id).then(contact => {
      this.contact = contact;
      config.navModel.setTitle(this.contact.fullName);
    });
  }

  save() {
    return this.validationController.validate().then(errors => {
      if (errors.length > 0) {
        return;
      }

      return this.contactGateway.update(this.contact.id, this.contact)
        .then(() => this.router.navigateToRoute('contact-details', { id: this.contact.id }));
    });
  }
}
