import {inject, DOM, dynamicOptions} from 'aurelia-framework';
import 'bootstrap';

const properties = [
  'animation', 'container', 'delay', 'html', 
  'placement', 'title', 'trigger', 'viewport'
];

@inject(DOM.Element)
@dynamicOptions
export class BsTooltipCustomAttribute {

  isAttached = false;

  constructor(element) {
    this.element = element;
  }

  attached() {
    const init = {};
    for (let property of properties) {
      init[property] = this[property];
    }
    $(this.element).tooltip(init);
    this.isAttached = true;
  }

  detached() {
    this.isAttached = false;
    $(this.element).tooltip('destroy');
  }

  propertyChanged(name) {
    if (this.isAttached && properties.indexOf(name) >= 0) {
      $(this.element).data('bs.tooltip').options[name] = this[name];
    }
  }
}