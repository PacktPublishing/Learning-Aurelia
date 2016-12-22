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
