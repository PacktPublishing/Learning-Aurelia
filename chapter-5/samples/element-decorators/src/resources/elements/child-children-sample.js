import {inlineView, child, children} from 'aurelia-framework';

@inlineView('<template><slot></slot></template>')
export class ChildChildrenSample {
  @child('header') header;
  @children('item') items;

  headerChanged() {
    console.log(this.header);
  }

  itemsChanged() {
    console.log(this.items);
  }
}
