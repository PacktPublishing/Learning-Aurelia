export class App {

  configureRouter(config, router) {
    this.router = router;
    config.title = 'Learning Aurelia';
    config.map([
      { route: '', redirect: 'contacts' },
      { route: 'contacts', name: 'contacts', moduleId: 'contact-list', nav: true, title: 'Contacts' },
      { route: 'contacts/:id', name: 'contact-details', moduleId: 'contact-details' },
    ]);
    config.mapUnknownRoutes('not-found');
  }
}
