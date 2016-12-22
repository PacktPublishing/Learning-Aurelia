function findDefaultRoute(router) {
  return router.navigation[0].relativeHref;
}

export class App {

  configureRouter(config, router) {
    this.router = router;
    config.title = 'title';
    config.map([
      { route: '', redirect: findDefaultRoute(router) },
    ]);
    config.mapUnknownRoutes('not-found');
  }
}
