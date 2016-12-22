export class App {

  configureRouter(config, router) {
    this.router = router;
    config.title = 'Learning Aurelia';
    config.map([
      { route: '', redirect: 'contacts' },
      { route: 'contacts', name: 'contacts', moduleId: 'contacts/main', nav: true, title: 'Contacts' },
    ]);
    config.mapUnknownRoutes('not-found');
  }
}
