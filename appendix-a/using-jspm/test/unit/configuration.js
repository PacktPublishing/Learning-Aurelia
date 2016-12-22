import Backend from 'i18next-xhr-backend';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin('aurelia-i18n', (i18n) => {
      i18n.i18next.use(Backend);

      return i18n.setup({
        backend: {
          loadPath: './locales/{{lng}}/{{ns}}.json', 
        },
        lng : 'en',
        fallbackLng : 'en'
      });
    });
}
