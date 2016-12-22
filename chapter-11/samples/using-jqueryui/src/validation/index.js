import {ValidationMessageProvider} from 'aurelia-validation';
import './rules';
import {BootstrapFormValidationRenderer} from './bootstrap-form-validation-renderer';
import {I18nValidationMessageProvider} from './i18n-validation-message-provider';

export function configure(config) {
  config.plugin('aurelia-validation');
  
  config.container.registerHandler('bootstrap-form', container => container.get(BootstrapFormValidationRenderer));

  config.container.registerSingleton(ValidationMessageProvider, I18nValidationMessageProvider);
}
