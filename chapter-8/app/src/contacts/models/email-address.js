import {ValidationRules} from 'aurelia-validation';

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
