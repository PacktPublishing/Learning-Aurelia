import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator'; 
import {Contact} from '../models/contact';

@inject(EventAggregator)
export class ContactStore {

  contacts = [];

  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
  }

  activate() {
    this.subscriptions = [
      this.eventAggregator.subscribe('contacts.loaded', e => {
        this.contacts.splice(0);
        this.contacts.push.apply(this.contacts, e.contacts);
      }),
      this.eventAggregator.subscribe('contact.created', e => {
        const index = this.contacts.findIndex(c => c.id == e.contact.id);
        if (index < 0) {
          this.contacts.push(e.contact);
        }
      }),
      this.eventAggregator.subscribe('contact.updated', e => {
        const index = this.contacts.findIndex(c => c.id == e.contact.id);
        if (index >= 0) {
          Object.assign(this.contacts[index], e.contact);
        }
      }),
      this.eventAggregator.subscribe('contact.deleted', e => {
        const index = this.contacts.findIndex(c => c.id == e.contact.id);
        if (index >= 0) {
          this.contacts.splice(index, 1);
        }
      }),
    ];
  }

  detached() {
    this.subscriptions.forEach(s => s.dispose());
    this.subscriptions = null;
  }

  getById(id) {
    const index = this.contacts.findIndex(c => c.id == id);
    if (index < 0) {
      return Promise.reject();
    }
    return Promise.resolve(Contact.fromObject(this.contacts[index]));
  }
}
