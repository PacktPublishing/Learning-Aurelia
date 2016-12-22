export class App {

  configureRouter(config, router) {
    this.router = router;
    config.title = 'Learning Aurelia';
    config.map([
      { route: '', redirect: 'contacts' },
      { route: 'contacts', name: 'contacts', moduleId: 'contacts/components/list', nav: true, title: 'Contacts' },
      { route: 'contacts/new', name: 'contact-creation', moduleId: 'contacts/components/creation', title: 'New contact' },
      { route: 'contacts/:id', name: 'contact-details', moduleId: 'contacts/components/details' },
      { route: 'contacts/:id/edit', name: 'contact-edition', moduleId: 'contacts/components/edition' },
      { route: 'contacts/:id/photo', name: 'contact-photo', moduleId: 'contacts/components/photo' },
    ]);
    config.mapUnknownRoutes('not-found');
  }
}
