export class App {
  configureRouter(config, router) {
    config.title = 'Learning Aurelia';
    config.options.pushState = true;
    config.options.hashChange = false;
    config.map([
      { route: ['', 'page-1'], name: 'page-1', nav: true, title: 'Page 1', moduleId: 'page-1' },
      { route: 'page-2', name: 'page-2', nav: true, title: 'Page 2', moduleId: 'page-2' },
    ]);

    this.router = router;
  }
}
