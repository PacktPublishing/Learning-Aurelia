import {inject, DOM, dynamicOptions} from 'aurelia-framework';

const properties = [
  'classes', 'content', 'disabled', 'hide', 'position', 'show', 'track', 
];

@dynamicOptions
@inject(DOM.Element)
export class JqTooltipCustomAttribute {

  isAttached = false;

  constructor(element) {
    this.element = element;
  }

  propertyChanged(name) {
    if (this.isAttached && properties.indexOf(name) >= 0) {
      $(this.element).tooltip('option', name, this[name]);
    }
  }

  attached() {
    if (!this.element.hasAttribute('title')) {
      this.element.setAttribute('title', '');
    }
    const options = {};
    for (let property of properties) {
      options[property] = this[property];
    }
    $(this.element).tooltip(options);
    this.isAttached = true;
  }

  detached() {
    this.isAttached = false;
    $(this.element).tooltip('destroy');
  }
}
