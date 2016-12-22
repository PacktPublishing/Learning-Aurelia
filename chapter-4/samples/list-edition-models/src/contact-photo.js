import {inject, NewInstance} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {ValidationController, ValidationRules, validateTrigger} from 'aurelia-validation';

import {ContactGateway} from './contact-gateway';

@inject(ContactGateway, Router, NewInstance.of(ValidationController))
export class ContactPhoto {

  photo = null;

  constructor(contactGateway, router, validationController) {
    validationController.validateTrigger = validateTrigger.change;
    this.contactGateway = contactGateway;
    this.router = router;
    this.validationController = validationController;

    ValidationRules
      .ensure('photo')
        .satisfiesRule('notEmpty')
          .withMessage('${$displayName} must contain 1 file.')
        .satisfiesRule('maxFileSize', 1024 * 1024 * 2)
        .satisfiesRule('fileExtension', ['.jpg', '.png'])
      .on(this);
  }

  activate(params, config) {
    return this.contactGateway.getById(params.id).then(contact => {
      this.contact = contact;
      config.navModel.setTitle(this.contact.fullName);
    });
  }

  save() {
    this.validationController.validate().then(errors => {
      if (errors.length > 0) {
        return;
      }

      this.contactGateway.updatePhoto(this.contact.id, this.photo.item(0)).then(() => {
          this.router.navigateToRoute('contact-details', { id: this.contact.id });
      });
    });
  }
}
