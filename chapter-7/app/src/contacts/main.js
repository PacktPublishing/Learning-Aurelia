import {inlineView} from 'aurelia-framework';

@inlineView('<template><router-view></router-view></template>')
export class Contacts {

  configureRouter(config) {
    config.map([
      { route: '', name: 'contacts', moduleId: './components/list', title: 'Contacts' },
      { route: 'new', name: 'contact-creation', moduleId: './components/creation', title: 'New contact' },
      { route: ':id', name: 'contact-details', moduleId: './components/details' },
      { route: ':id/edit', name: 'contact-edition', moduleId: './components/edition' },
      { route: ':id/photo', name: 'contact-photo', moduleId: './components/photo' },
    ]);
  }
}
