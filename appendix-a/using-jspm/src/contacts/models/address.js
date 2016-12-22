import {ValidationRules} from 'aurelia-validation';

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
