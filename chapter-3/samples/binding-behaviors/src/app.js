export class App {

  configureRouter(config, router) {
    this.router = router;
    config.title = 'Learning Aurelia | Chapter 3 | Binding Behaviors';
    config.map([
      { route: '', redirect: 'one-time' },
      { route: 'one-time', name: 'one-time', moduleId: './one-time', nav: true, title: 'oneTime' },
      { route: 'throttle', name: 'throttle', moduleId: './throttle', nav: true, title: 'throttle' },
      { route: 'debounce', name: 'debounce', moduleId: './debounce', nav: true, title: 'debounce' },
      { route: 'updateTrigger', name: 'updateTrigger', moduleId: './updateTrigger', nav: true, title: 'updateTrigger' },
      { route: 'signal', name: 'signal', moduleId: './signal', nav: true, title: 'signal' },
    ]);
  }
}
