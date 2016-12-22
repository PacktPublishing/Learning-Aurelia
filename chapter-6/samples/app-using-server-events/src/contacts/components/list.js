import {inject, computedFrom} from 'aurelia-framework';
import {ContactStore} from '../services/store';

@inject(ContactStore)
export class ContactList {
  
  constructor(store) {
    this.contacts = store.contacts;
  }
}
