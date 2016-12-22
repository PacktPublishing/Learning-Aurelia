import {inject, NewInstance} from 'aurelia-framework';
import {ValidationController} from 'aurelia-validation';
import {Router} from 'aurelia-router';
import {ContactGateway} from './contact-gateway';
import {Contact} from './models';

@inject(ContactGateway, NewInstance.of(ValidationController), Router)
export class ContactCreation {

  contact = new Contact();

  constructor(contactGateway, validationController, router) {
    this.contactGateway = contactGateway;
    this.validationController = validationController;
    this.router = router;
  }

  save() {
    return this.validationController.validate().then(errors => {
      if (errors.length > 0) {
        return;
      }

      return this.contactGateway.create(this.contact)
        .then(() => this.router.navigateToRoute('contacts'));
    });
  }
}
