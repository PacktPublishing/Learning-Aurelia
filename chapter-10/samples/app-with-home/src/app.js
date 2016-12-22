export class App {

  configureRouter(config, router) {
    this.router = router;
    config.title = 'Learning Aurelia';
    config.map([
      { route: '', moduleId: 'home' },
    ]);
    config.mapUnknownRoutes('not-found');
  }
}
