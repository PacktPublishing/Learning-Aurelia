import 'bootstrap';
import 'bootstrap-datepicker';
import {inject, Loader, bindable, bindingMode} from 'aurelia-framework';

const loadedLocales = { 'en': 'en' };

@inject(Loader)
export class BsDatepickerCustomElement {

  static defaultOptions = { autoclose: true, zIndexOffset: 1050 };

  @bindable({ defaultBindingMode: bindingMode.twoWay }) date;
  @bindable options;

  isAttached = false;
  isUpdating = false;

  constructor(loader) {
    this.loader = loader;
  }

  ensureLocaleLoaded(locale) {
    if (!locale || locale in loadedLocales) {
      return Promise.resolve();
    }
    return this.loader.loadModule(`bootstrap-datepicker/dist/locales/bootstrap-datepicker.${locale}.min`).then(() => {
      loadedLocales[locale] = locale;
    });
  }

  createDatepicker() {
    const options = Object.assign({}, 
      BsDatepickerCustomElement.defaultOptions, 
      this.options);
    this.ensureLocaleLoaded(this.options.language).then(() => {
      $(this.input).datepicker(options)
        .on('clearDate', this.updateDate)
        .on('changeDate', this. updateDate);
      if (this.date) {
        this.updateDatepickerDate();
      }
    });
  }

  destroyDatepicker() {
    $(this.input)
      .datepicker()
      .off('clearDate', this.updateDate)
      .off('changeDate', this.updateDate)
      .datepicker('destroy');
  }

  updateDate = function() {
    if (!this.isUpdating) {
      this.date = $(this.input).datepicker('getUTCDate');
    }
  }.bind(this);

  updateDatepickerDate() {
    $(this.input).datepicker('setUTCDate', this.date);
  }

  optionsChanged() {
    if (this.isAttached) {
      this.destroyDatepicker();
      this.createDatepicker();
    }
  }

  dateChanged() {
    if (this.isAttached) {
      this.isUpdating = true;
      this.updateDatepickerDate();
      this.isUpdating = false;
    }
  }

  attached() {
    this.createDatepicker();
    this.isAttached = true;
  }

  detached() {
    this.isAttached = false;
    this.destroyDatepicker();
  }
}
