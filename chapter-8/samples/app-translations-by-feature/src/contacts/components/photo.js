import {inject, NewInstance} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {ValidationController, ValidationRules} from 'aurelia-validation';
import {EventAggregator} from 'aurelia-event-aggregator';

import {ContactGateway} from '../services/gateway';

@inject(ContactGateway, Router, NewInstance.of(ValidationController), EventAggregator)
export class ContactPhoto {

  photo = null;
  photoErrors = [];

  constructor(contactGateway, router, validationController, events) {
    this.contactGateway = contactGateway;
    this.router = router;
    this.validationController = validationController;
    this.events = events;

    ValidationRules
      .ensure('photo')
        .satisfiesRule('notEmpty')
          .withMessageKey('contacts:validation.singleFile')
        .satisfiesRule('maxFileSize', 1024 * 1024 * 2)
        .satisfiesRule('fileExtension', ['.jpg', '.png'])
      .on(this);
  }

  get areFilesValid() {
    return !this.photoErrors || this.photoErrors.length === 0;
  }

  get preview() {
    return this.photo && this.photo.length > 0 && this.areFilesValid
      ? this.photo.item(0) : null;
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
        return;
      }

      return this.contactGateway.updatePhoto(this.contact.id, this.photo.item(0)).then(() => {
          this.router.navigateToRoute('contact-details', { id: this.contact.id });
      });
    });
  }
}
