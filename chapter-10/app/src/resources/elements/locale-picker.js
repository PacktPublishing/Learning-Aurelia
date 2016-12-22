import {inject, bindable} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';

@inject(I18N)
export class LocalePickerCustomElement {
 
  @bindable selectedLocale;
  @bindable locales = ['en', 'fr'];

  constructor(i18n) {
    this.i18n = i18n;

    this.selectedLocale = this.i18n.getLocale();
    this.isChangingLocale = false;
  }

  selectedLocaleChanged() {
    this.isChangingLocale = true;
    this.i18n.setLocale(this.selectedLocale).then(() => {
      this.isChangingLocale = false;
    });
  }
}
