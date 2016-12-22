import {inject, NewInstance} from 'aurelia-framework';
import {ValidationController} from 'aurelia-validation';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ContactGateway} from '../services/gateway';

@inject(ContactGateway, NewInstance.of(ValidationController), Router, EventAggregator)
export class ContactEdition {

  constructor(contactGateway, validationController, router, events) {
    this.contactGateway = contactGateway;
    this.validationController = validationController;
    this.router = router;
    this.events = events;
  }

  activate(params, config) {
    return this.contactGateway.getById(params.id).then(contact => {
      this.contact = contact;
      config.navModel.setTitle(this.contact.fullName);

      this.i18nChangedSubscription = this.events.subscribe('i18n:locale:changed', () => {
        this.validationController.validate();
      });
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
        this.form.emphasizeErrors();
        return;
      }

      return this.contactGateway.update(this.contact.id, this.contact)
        .then(() => this.router.navigateToRoute('contact-details', { id: this.contact.id }));
    });
  }
}
