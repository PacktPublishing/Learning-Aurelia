import {inject, NewInstance} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {ValidationController, ValidationRules} from 'aurelia-validation';

import {ContactGateway} from '../services/gateway';

@inject(ContactGateway, Router, NewInstance.of(ValidationController))
export class ContactPhoto {

  photo = null;
  photoErrors = [];

  constructor(contactGateway, router, validationController) {
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
    });
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
