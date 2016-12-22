import {I18N} from 'aurelia-i18n';

export function loadI18nNs(container, ns) {
  const i18n = container.invoke(I18N);
  return new Promise((resolve, reject) => {
    i18n.i18next.loadNamespaces(ns, e => {
      if (e) {
        reject(e);
      } else {
        resolve();
      }
    });
  });
}
