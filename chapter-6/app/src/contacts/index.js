import {Router} from 'aurelia-router';

export function configure(config) {
  const router = config.container.get(Router);
  router.addRoute({ route: 'contacts', name: 'contacts', moduleId: 'contacts/main', nav: true, title: 'Contacts' });
}
