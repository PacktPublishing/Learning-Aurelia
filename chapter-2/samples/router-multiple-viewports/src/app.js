export class App {
  configureRouter(config, router) {
    config.title = 'Learning Aurelia';
    config.map([
      {
        route: ['', 'h1p1'], name: 'h1p1', nav: true, title: 'Header 1 & Page 1', 
        viewPorts: { 
          header: { moduleId: 'header-1' }, 
          content: { moduleId: 'page-1' }
        }
      },
      {
        route: 'h1p2', name: 'h1p2', nav: true, title: 'Header 1 & Page 2', 
        navigationStrategy: ins => {
          ins.config.viewPorts = {
            header: { moduleId: 'header-1' }, 
            content: { moduleId: 'page-2' }
          };
        }
      },
      {
        route: 'h2p2', name: 'h2p2', nav: true, title: 'Header 2 & Page 2', 
        viewPorts: { 
          header: { moduleId: 'header-2' }, 
          content: { moduleId: 'page-2' }
        }
      },
    ]);

    this.router = router;
  }
}
