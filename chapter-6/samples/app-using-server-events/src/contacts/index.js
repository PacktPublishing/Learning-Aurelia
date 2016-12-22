import {Router} from 'aurelia-router';
import {ContactStore} from './services/store';
import {ContactEventDispatcher} from './services/event-dispatcher';

export function configure(config) {
  const router = config.container.get(Router);
  router.addRoute({ route: 'contacts', name: 'contacts', moduleId: 'contacts/main', nav: true, title: 'Contacts' });

  config.postTask(() => {
    const store = config.container.get(ContactStore);
    store.activate();
    
    const dispatcher = config.container.get(ContactEventDispatcher);
    return dispatcher.activate();
  });
}
