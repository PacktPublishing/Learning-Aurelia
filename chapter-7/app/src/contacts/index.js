import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';
import {ContactGateway} from './services/gateway';
import environment from 'environment';

export function configure(config) {
  const router = config.container.get(Router);
  router.addRoute({ route: 'contacts', name: 'contacts', moduleId: 'contacts/main', nav: true, title: 'Contacts' });

  const httpClient = config.container.invoke(HttpClient).configure(config => {
    config
      .useStandardConfiguration()
      .withBaseUrl(environment.contactsUrl);
  });
  config.container.registerInstance(ContactGateway, new ContactGateway(httpClient));
}
