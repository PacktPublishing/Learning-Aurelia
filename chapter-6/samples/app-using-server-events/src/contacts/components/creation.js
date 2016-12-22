import {inject, NewInstance} from 'aurelia-framework';
import {ValidationController} from 'aurelia-validation';
import {Router} from 'aurelia-router';
import {ContactGateway} from '../services/gateway';
import {Contact} from '../models/contact';

@inject(ContactGateway, NewInstance.of(ValidationController), Router)
export class ContactCreation {

  contact = new Contact();

  constructor(gateway, validationController, router) {
    this.gateway = gateway;
    this.validationController = validationController;
    this.router = router;
  }

  save() {
    return this.validationController.validate().then(errors => {
      if (errors.length > 0) {
        return;
      }

      return this.gateway.create(this.contact)
        .then(() => this.router.navigateToRoute('contacts'));
    });
  }
}
