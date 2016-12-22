import {activationStrategy} from 'aurelia-router';

export class Header {

  determineActivationStrategy() {
    return activationStrategy.invokeLifecycle;
  }

  activate() {
    console.log('Header 2 activated');
  }
}
