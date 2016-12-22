export class App {
  
  configureRouter(config, router) {
    this.router = router;
    config.title = 'Learning Aurelia | Chapter 4 | Binding Forms';
    config.map([
      { route: '', redirect: 'inputs' },
      { route: 'inputs', name: 'inputs', moduleId: './inputs', nav: true, title: 'Input & textarea' },
      { route: 'single-select', name: 'single-select', moduleId: './single-select', nav: true, title: 'Select (single-selection)' },
      { route: 'multi-select', name: 'multi-select', moduleId: './multi-select', nav: true, title: 'Select (multi-selection)' },
      { route: 'radio', name: 'radio', moduleId: './radio', nav: true, title: 'Radio buttons' },
      { route: 'checkbox', name: 'checkbox', moduleId: './checkbox', nav: true, title: 'Checkboxes' },
      { route: 'properties', name: 'properties', moduleId: './properties', nav: true, title: 'Disabled & Readonly' },
    ]);
  }
}
