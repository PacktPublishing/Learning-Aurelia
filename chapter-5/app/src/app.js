export class App {

  configureRouter(config, router) {
    this.router = router;
    config.title = 'Learning Aurelia';
    config.map([
      { route: '', redirect: 'contacts' },
      { route: 'contacts', name: 'contacts', moduleId: 'contact-list', nav: true, title: 'Contacts' },
      { route: 'contacts/new', name: 'contact-creation', moduleId: 'contact-creation', title: 'New contact' },
      { route: 'contacts/:id', name: 'contact-details', moduleId: 'contact-details' },
      { route: 'contacts/:id/edit', name: 'contact-edition', moduleId: 'contact-edition' },
      { route: 'contacts/:id/photo', name: 'contact-photo', moduleId: 'contact-photo' },
    ]);
    config.mapUnknownRoutes('not-found');
  }
}
