import {inject, bindable, DOM} from 'aurelia-framework';
import {Animator} from 'aurelia-templating';

@inject(DOM.Element, Animator)
export class ContactFormCustomElement {

  @bindable contact;
  
  constructor(element, animator) {
    this.element = element;
    this.animator = animator;
  }

  emphasizeErrors() {
    const errors = this.element.querySelectorAll('.validation-message');
    return this.animator.animate(Array.from(errors), 'blink');
  }
}
