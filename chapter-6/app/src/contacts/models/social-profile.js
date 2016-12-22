import {ValidationRules} from 'aurelia-validation';

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
