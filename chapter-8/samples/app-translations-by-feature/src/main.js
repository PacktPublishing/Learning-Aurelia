import Backend from 'i18next-xhr-backend';
import environment from './environment';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';

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
    .plugin('aurelia-i18n', (i18n) => {
      i18n.i18next.use(Backend);

      return i18n.setup({
        backend: {
          loadPath: './src/{{ns}}/locales/{{lng}}.json', 
        },
        defaultNS: 'app',
        ns: ['app'],
        lng : 'en',
        fallbackLng : 'en',
        debug : environment.debug
      }).then(() => {
        const router = aurelia.container.get(Router);
        const events = aurelia.container.get(EventAggregator);

        router.transformTitle = title => i18n.tr(title);
        events.subscribe('i18n:locale:changed', () => { router.updateTitle(); });
      });
    })
    .feature('validation')
    .feature('resources')
    .feature('contacts');
  
  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
