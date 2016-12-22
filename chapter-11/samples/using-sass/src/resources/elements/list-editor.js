import {bindable} from 'aurelia-framework';

export class ListEditorCustomElement {
  
  @bindable items = [];
  @bindable addItem;

  animated = false;

  attached() {
    setTimeout(() => { this.animated = true; });
  }
}
