// we want font-awesome to load as soon as possible to show the fa-spinner
import '../styles/styles.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

// comment out if you don't want a Promise polyfill (remove also from webpack.common.js)
import * as Bluebird from 'bluebird';
Bluebird.config({ warnings: false });

import Backend from 'i18next-xhr-backend';
import environment from './environment';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-animator-css')
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
  
  aurelia.start().then(() => aurelia.setRoot());
}
