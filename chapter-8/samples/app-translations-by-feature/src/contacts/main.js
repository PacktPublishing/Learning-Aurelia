import {inject, inlineView, Container} from 'aurelia-framework';
import {ValidationMessageProvider, Validator, StandardValidator} from 'aurelia-validation';
import {I18nValidationMessageProvider} from 'validation/i18n-validation-message-provider';

@inject(Container)
@inlineView('<template><router-view></router-view></template>')
export class Contacts {

  constructor(container) {
    const validationMessageProvider = container.invoke(I18nValidationMessageProvider);
    validationMessageProvider.options.propertyNameKeyPrefix = 'contacts:properties.';
    container.registerInstance(ValidationMessageProvider, validationMessageProvider);
    container.registerInstance(Validator, container.invoke(StandardValidator));
  }

  configureRouter(config) {
    config.map([
      { route: '', name: 'contacts', moduleId: './components/list', title: 'contacts:contacts' },
      { route: 'new', name: 'contact-creation', moduleId: './components/creation', title: 'contacts:newContact' },
      { route: ':id', name: 'contact-details', moduleId: './components/details' },
      { route: ':id/edit', name: 'contact-edition', moduleId: './components/edition' },
      { route: ':id/photo', name: 'contact-photo', moduleId: './components/photo' },
    ]);
  }
}
