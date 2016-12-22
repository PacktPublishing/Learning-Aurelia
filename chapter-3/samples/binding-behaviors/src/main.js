import {HttpClient} from 'aurelia-fetch-client';

import environment from './environment';

//Configure Bluebird Promises.
//Note: You may want to use environment-specific configuration.
Promise.config({
  warnings: {
    wForgottenReturn: false
  }
});

function configureFetchClient(config) {
  config.useStandardConfiguration();
}

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.use.container
    .registerHandler(HttpClient, () => new HttpClient().configure(configureFetchClient));

  aurelia.start().then(() => aurelia.setRoot());
}
