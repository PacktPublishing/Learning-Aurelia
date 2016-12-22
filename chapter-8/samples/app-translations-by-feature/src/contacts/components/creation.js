import {inject, NewInstance} from 'aurelia-framework';
import {ValidationController} from 'aurelia-validation';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ContactGateway} from '../services/gateway';
import {Contact} from '../models/contact';

@inject(ContactGateway, NewInstance.of(ValidationController), Router, EventAggregator)
export class ContactCreation {

  contact = new Contact();

  constructor(contactGateway, validationController, router, events) {
    this.contactGateway = contactGateway;
    this.validationController = validationController;
    this.router = router;
    this.events = events;
  }

  activate() {
    this.i18nChangedSubscription = this.events.subscribe('i18n:locale:changed', () => {
      this.validationController.validate();
    });
  }

  deactivate() {
    if (this.i18nChangedSubscription) {
      this.i18nChangedSubscription.dispose();
      this.i18nChangedSubscription = null;
    }
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
