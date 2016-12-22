import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {I18N} from 'aurelia-i18n';
import {BindingSignaler} from 'aurelia-templating-resources';
import {ContactGateway} from '../services/gateway';

@inject(ContactGateway, Router, I18N, BindingSignaler)
export class ContactDetails {

  constructor(contactGateway, router, i18n, signaler) {
    this.contactGateway = contactGateway;
    this.router = router;
    this.i18n = i18n;
    this.signaler = signaler;
  }

  activate(params, config) {
    return this.contactGateway.getById(params.id)
      .then(contact => {
        this.contact = contact;
        config.navModel.setTitle(this.contact.fullName);
        this.rtUpdater = setInterval(() => this.signaler.signal('rt-update'), 1000);
      });
  }

  tryDelete() {
    if (confirm(this.i18n.tr('contacts:confirmDelete'))) {
      this.contactGateway.delete(this.contact.id)
        .then(() => { this.router.navigateToRoute('contacts'); });
    }
  }

  deactivate() {
    if (this.rtUpdater) {
      clearInterval(this.rtUpdater);
      this.rtUpdater = null;
    }
  }
}
