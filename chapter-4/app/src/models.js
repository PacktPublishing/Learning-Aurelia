import {ValidationRules} from 'aurelia-validation';

export class PhoneNumber {

  static fromObject(src) {
    return Object.assign(new PhoneNumber(), src);
  }

  constructor() {
    ValidationRules
      .ensure('type')
        .required()
        .maxLength(25)
      .ensure('number')
        .required()
        .maxLength(25)
      .on(this);
  }

  type = 'Home';
  number = '';
}

export class EmailAddress {

  static fromObject(src) {
    return Object.assign(new EmailAddress(), src);
  }

  constructor() {
    ValidationRules
      .ensure('type')
        .required()
        .maxLength(25)
      .ensure('address')
        .required()
        .maxLength(250)
        .email()
      .on(this);
  }

  type = 'Home';
  address = '';
}

export class Address {

  static fromObject(src) {
    return Object.assign(new Address(), src);
  }

  constructor() {
    ValidationRules
      .ensure('type')
        .required()
        .maxLength(25)
      .ensure('number')
        .required()
        .maxLength(100)
      .ensure('street')
        .required()
        .maxLength(100)
      .ensure('postalCode')
        .required()
        .maxLength(25)
      .ensure('city')
        .required()
        .maxLength(100)
      .ensure('state')
        .maxLength(100)
      .ensure('country')
        .required()
        .maxLength(100)
      .on(this);
  }

  type = 'Home';
  number = '';
  street = '';
  postalCode = '';
  city = '';
  state = '';
  country = '';
}

export class SocialProfile {

  static fromObject(src) {
    return Object.assign(new SocialProfile(), src);
  }

  constructor() {
    ValidationRules
      .ensure('type')
        .required()
        .maxLength(25)
      .ensure('username')
        .required()
        .maxLength(100)
      .on(this);
  }

  type = 'GitHub';
  username = '';
}

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
