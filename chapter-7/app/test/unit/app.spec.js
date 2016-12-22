import {App} from '../../src/app';

class RouterConfigStub {
  constructor() {
    this.title = '';
    this.routes = [];
    this.unknownRoutesComponent = null;
  }

  map(routes) {
    this.routes = routes;
  }

  mapUnknownRoutes(unknownRoutesComponent) {
    this.unknownRoutesComponent = unknownRoutesComponent;
  }
}

describe('the app', () => {
  let
    sut,
    config,
    firstRoute,
    router;

  beforeEach(() => {
    sut = new App();
    config = new RouterConfigStub();
    firstRoute = { relativeHref: 'test' };
    router = { navigation: [firstRoute] };
  });


  it('sets the title', () => {
    sut.configureRouter(config, router);

    expect(config.title).toBe('Learning Aurelia');
  });

  it('creates the default route', () => {
    sut.configureRouter(config, router);

    expect(config.routes).toEqual([
      { route: '', redirect: firstRoute.relativeHref }
    ]);
  });

  it('maps unknown routes to 404', () => {
    sut.configureRouter(config, router);

    expect(config.unknownRoutesComponent).toBe('not-found');
  });
});
