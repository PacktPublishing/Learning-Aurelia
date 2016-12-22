import {customAttribute, bindingMode, inject, DOM} from 'aurelia-framework';

@customAttribute('file-drop-target', bindingMode.twoWay)
@inject(DOM.Element)
export class FileDropTarget {
  constructor(element) {
    this.element = element;
    this._onDragOver = this.onDragOver.bind(this);
    this._onDrop = this.onDrop.bind(this);
    this._onDragEnd = this.onDragEnd.bind(this);
  }

  attached() {
    this.element.addEventListener('dragover', this._onDragOver);
    this.element.addEventListener('drop', this._onDrop);
    this.element.addEventListener('dragend', this._onDragEnd);
  }

  onDragOver(e) {
    e.preventDefault();
  }

  onDrop(e) {
    e.preventDefault();
    this.value = e.dataTransfer.files;
  }

  onDragEnd(e) {
    e.dataTransfer.clearData();
  }

  detached() {
    this.element.removeEventListener('dragend', this._onDragEnd);
    this.element.removeEventListener('drop', this._onDrop);
    this.element.removeEventListener('dragover', this._onDragOver);
  }
}
