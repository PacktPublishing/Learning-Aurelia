import './rules';
import {BootstrapFormValidationRenderer} from './bootstrap-form-validation-renderer';

export function configure(config) {
  config.plugin('aurelia-validation');
  
  config.container.registerHandler('bootstrap-form', container => container.get(BootstrapFormValidationRenderer));
}
