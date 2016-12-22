import {inject, PLATFORM, DOM} from 'aurelia-framework';

const URL = PLATFORM.global.URL;
const Blob = PLATFORM.global.Blob;

@inject(DOM.Element)
export class BlobSrcCustomAttribute {

  constructor(element) {
    this.element = element;
  }

  disposeObjectUrl() {
    if (this.objectUrl && URL) {
      this.element.src = '';
      URL.revokeObjectURL(this.objectUrl);
      this.objectUrl = null;
    }
  }

  valueChanged(value) {
    this.disposeObjectUrl();

    if (Blob && URL && value instanceof Blob) {
      this.objectUrl = URL.createObjectURL(value);
      this.element.src = this.objectUrl;
    }
  }

  unbind() {
    this.disposeObjectUrl();
  }
}
