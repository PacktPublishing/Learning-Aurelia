import {bindable} from 'aurelia-framework';

export class ListEditorCustomElement {
  
  @bindable items = [];
  @bindable addItem;
}
