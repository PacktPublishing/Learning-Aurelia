import {bindable} from 'aurelia-framework';
import Sortable from 'sortablejs';

export class ListEditorCustomElement {
  
  @bindable items = [];
  @bindable addItem;

  animated = false;

  moveItem(oldIndex, newIndex) {
    const item = this.items[oldIndex];
    this.items.splice(oldIndex, 1);
    this.items.splice(newIndex, 0, item);
  }

  attached() {
    this.sortable = Sortable.create(this.container, {
      sort: true,
      draggable: '.le-item',
      handle: '.sort-handle', 
      animation: 150,
      onUpdate: (e) => {
        if (e.newIndex != e.oldIndex) {
          this.animated = false;
          this.moveItem(e.oldIndex, e.newIndex);
          setTimeout(() => { this.animated = true; });
        }
      }
    });
    setTimeout(() => { this.animated = true; });
  }

  detached() {
    this.sortable.destroy();
    this.sortable = null;
  }
}
