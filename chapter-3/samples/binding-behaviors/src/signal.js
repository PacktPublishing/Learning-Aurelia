import {inject} from 'aurelia-framework';
import {BindingSignaler} from 'aurelia-templating-resources';

@inject(BindingSignaler)
export class Signal {

  lastUpdatedAt = new Date();

  constructor(signaler) {
    this.signaler = signaler;
  }

  activate() {
    this.intervalHandle = setInterval(() => this.signaler.signal('now'), 2000);
  }

  deactivate() {
    clearInterval(this.intervalHandle);
  }
}
