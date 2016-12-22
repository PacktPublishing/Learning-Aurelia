import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';
import {ContactGateway} from './services/gateway';
import {loadI18nNs} from 'app/helpers';
import environment from 'environment';

function configureRoute(container) {
  const router = container.get(Router);
  router.addRoute({ route: 'contacts', name: 'contacts', moduleId: 'contacts/main', nav: true, title: 'contacts:contacts' });
}

function configureGateway(container) {
  const httpClient = container.invoke(HttpClient).configure(config => {
    config
      .useStandardConfiguration()
      .withBaseUrl(environment.contactsUrl);
  });
  const gateway = new ContactGateway(httpClient);
  container.registerInstance(ContactGateway, gateway);
}

export function configure(config) {
  configureRoute(config.container);
  configureGateway(config.container);
  return loadI18nNs(config.container, 'contacts');
}
