import {inject, noView} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import Humane from 'humane-js';

@noView
@inject(EventAggregator, Humane)
export class ContactNotifications {

  constructor(events, humane) {
    this.events = events;
    this.humane = humane;
  }

  attached() {
    this.subscriptions = [
      this.events.subscribe('contact.created', e => {
        this.humane.log(`Contact '${e.contact.fullName}' was created.`);
      }),
      this.events.subscribe('contact.updated', e => {
        this.humane.log(`Contact '${e.contact.fullName}' was updated.`);
      }),
      this.events.subscribe('contact.deleted', e => {
        this.humane.log(`Contact '${e.contact.fullName}' was deleted.`);
      })
    ];
  }

  detached() {
    this.subscriptions.forEach(s => s.dispose());
    this.subscriptions = null;
  }
}
