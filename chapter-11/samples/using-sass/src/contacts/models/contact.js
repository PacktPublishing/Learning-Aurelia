import {ValidationRules} from 'aurelia-validation';

import {PhoneNumber} from './phone-number';
import {EmailAddress} from './email-address';
import {Address} from './address';
import {SocialProfile} from './social-profile';

export class Contact {

  static fromObject(src) {
    const contact = Object.assign(new Contact(), src);
    contact.phoneNumbers = contact.phoneNumbers.map(PhoneNumber.fromObject);
    contact.emailAddresses = contact.emailAddresses.map(EmailAddress.fromObject);
    contact.addresses = contact.addresses.map(Address.fromObject);
    contact.socialProfiles = contact.socialProfiles.map(SocialProfile.fromObject);
    return contact;
  }

  constructor() {
    ValidationRules
      .ensure('firstName')
        .maxLength(100)
      .ensure('lastName')
        .maxLength(100)
      .ensure('company')
        .maxLength(100)
      .ensure('birthday')
        .satisfiesRule('date')
      .ensure('note')
        .maxLength(2000)
      .on(this);
  }

  firstName = '';
  lastName = '';
  company = '';
  birthday = '';
  phoneNumbers = [];
  emailAddresses = [];
  addresses = [];
  socialProfiles = [];
  note = '';

  get isPerson() {
    return this.firstName || this.lastName;
  }

  get fullName() {
    const fullName = this.isPerson ? `${this.firstName} ${this.lastName}` : this.company;
    return fullName || '';
  }

  get firstLetter() {
    const name = this.lastName || this.firstName || this.company;
    return name ? name[0].toUpperCase() : '?';
  }

  addPhoneNumber() {
    this.phoneNumbers.push(new PhoneNumber());
  }

  addEmailAddress() {
    this.emailAddresses.push(new EmailAddress());
  }

  addAddress() {
    this.addresses.push(new Address());
  }

  addSocialProfile() {
    this.socialProfiles.push(new SocialProfile());
  }
}
