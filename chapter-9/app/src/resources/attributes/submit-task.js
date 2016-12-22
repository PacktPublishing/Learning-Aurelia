import {inject, DOM} from 'aurelia-framework';

@inject(DOM.Element)
export class SubmitTaskCustomAttribute {

  constructor(element) {
    this.element = element;
    this.onSubmit = this.trySubmit.bind(this);
  }

  attached() {
    this.element.addEventListener('submit', this.onSubmit);
    this.element.isSubmitTaskExecuting = false;
  }

  trySubmit(e) {
    e.preventDefault();
    if (this.task) {
      return;
    }

    this.element.isSubmitTaskExecuting = true;
    this.task = Promise.resolve(this.value()).then(
      () => this.completeTask(),
      () => this.completeTask());
  }

  completeTask() {
    this.task = null;
    this.element.isSubmitTaskExecuting = false;
  }

  detached() {
    this.element.removeEventListener('submit', this.onSubmit);
  }
}
