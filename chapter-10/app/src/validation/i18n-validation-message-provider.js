import {inject} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';
import {ValidationParser, ValidationMessageProvider} from 'aurelia-validation';

@inject(ValidationParser, I18N)
export class I18nValidationMessageProvider extends ValidationMessageProvider {

  options = {
    messageKeyPrefix: 'validation.messages.',
    propertyNameKeyPrefix: 'validation.properties.'
  };

  constructor(parser, i18n) {
    super(parser);
    this.i18n = i18n;
  }

  getMessage(key) {
    let translationKey = key.includes('.') || key.includes(':') ? key : `${this.options.messageKeyPrefix}${key}`;
    let translation = this.i18n.tr(translationKey);
    if (translation !== translationKey) {
      return this.parser.parseMessage(translation);
    }

    return super.getMessage(key);
  }

  getDisplayName(propertyName) {
    let translationKey = `${this.options.propertyNameKeyPrefix}${propertyName}`;
    let translation = this.i18n.tr(translationKey);
    if (translation !== translationKey) {
      return translation;
    }

    return super.getDisplayName(propertyName);
  }
}
