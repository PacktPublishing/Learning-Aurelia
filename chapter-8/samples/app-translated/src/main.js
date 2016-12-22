import Backend from 'i18next-xhr-backend';
import environment from './environment';

//Configure Bluebird Promises.
//Note: You may want to use environment-specific configuration.
Promise.config({
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('validation')
    .feature('resources')
    .feature('contacts')
    .plugin('aurelia-i18n', (i18n) => {
      i18n.i18next.use(Backend);

      return i18n.setup({
        backend: {
          loadPath: './locales/{{lng}}/{{ns}}.json', 
        },
        lng : 'en',
        fallbackLng : 'en',
        debug : environment.debug
      });
    });
  
  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
