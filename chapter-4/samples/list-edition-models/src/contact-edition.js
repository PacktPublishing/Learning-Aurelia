import {inject, NewInstance} from 'aurelia-framework';
import {ValidationController} from 'aurelia-validation';
import {Router} from 'aurelia-router';
import {DialogService} from 'aurelia-dialog';
import {ContactGateway} from './contact-gateway';
import {Contact, PhoneNumber, EmailAddress, Address, SocialProfile} from './models';

@inject(ContactGateway, NewInstance.of(ValidationController), Router, DialogService)
export class ContactEdition {

  constructor(contactGateway, validationController, router, dialogService) {
    this.contactGateway = contactGateway;
    this.validationController = validationController;
    this.router = router;
    this.dialogService = dialogService;
  }

  activate(params, config) {
    this.isNew = params.id === undefined;
    if (this.isNew) {
      this.contact = new Contact();
      config.navModel.setTitle('New contact');
    }
    else {
      return this.contactGateway.getById(params.id).then(contact => {
        this.contact = contact;
        config.navModel.setTitle(this.contact.fullName);
      });
    }
  }

  openEditDialog(view, model) {
    return new Promise((resolve, reject) => {
      this.dialogService.open({ 
        viewModel: 'dialogs/edition-dialog',
        view: `dialogs/${view}-dialog.html`, 
        model: model
      }).then(response => {
        if (response.wasCancelled) {
          reject();
        } else {
          resolve(response.output);
        }
      });
    });
  }

  editPhoneNumber(phoneNumber) {
    this.openEditDialog('phone-number', PhoneNumber.fromObject(phoneNumber))
      .then(result => { Object.assign(phoneNumber, result); });
  }

  addPhoneNumber() {
    this.openEditDialog('phone-number', new PhoneNumber())
      .then(result => { this.contact.phoneNumbers.push(result); });
  }

  editEmailAddress(emailAddress) {
    this.openEditDialog('email-address', EmailAddress.fromObject(emailAddress))
      .then(result => { Object.assign(emailAddress, result); });
  }

  addEmailAddress() {
    this.openEditDialog('email-address', new EmailAddress())
      .then(result => { this.contact.emailAddresses.push(result); });
  }

  editAddress(address) {
    this.openEditDialog('address', Address.fromObject(address))
      .then(result => { Object.assign(address, result); });
  }

  addAddress() {
    this.openEditDialog('address', new Address())
      .then(result => { this.contact.addresses.push(result); });
  }

  editSocialProfile(socialProfile) {
    this.openEditDialog('social-profile', SocialProfile.fromObject(socialProfile))
      .then(result => { Object.assign(socialProfile, result); });
  }

  addSocialProfile() {
    this.openEditDialog('social-profile', new SocialProfile())
      .then(result => { this.contact.socialProfiles.push(result); });
  }

  save() {
    this.validationController.validate().then(errors => {
      if (errors.length > 0) {
        return;
      }

      if (this.isNew) {
        this.contactGateway.create(this.contact)
          .then(() => this.router.navigateToRoute('contacts'));
      }
      else {
        this.contactGateway.update(this.contact.id, this.contact)
          .then(() => this.router.navigateToRoute('contact-details', { id: this.contact.id }));
      }
    });
  }
}
