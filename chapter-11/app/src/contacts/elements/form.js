import {inject, bindable, DOM} from 'aurelia-framework';
import {Animator} from 'aurelia-templating';
import {I18N} from 'aurelia-i18n';
import {EventAggregator} from 'aurelia-event-aggregator';


@inject(DOM.Element, Animator, I18N, EventAggregator)
export class ContactFormCustomElement {

  @bindable contact;
  
  constructor(element, animator, i18n, eventAggregator) {
    this.element = element;
    this.animator = animator;
    this.i18n = i18n;
    this.eventAggregator = eventAggregator;
  }

  bind() {
    this.locale = this.i18n.getLocale();
    this._localeChangedSubscription = this.eventAggregator
      .subscribe('i18n:locale:changed', () => { this.locale = this.i18n.getLocale(); });
  }

  unbind() {
    this._localeChangedSubscription.dispose();
    this._localeChangedSubscription = null;
  }

  emphasizeErrors() {
    const errors = this.element.querySelectorAll('.validation-message');
    return this.animator.animate(Array.from(errors), 'blink');
  }
}
