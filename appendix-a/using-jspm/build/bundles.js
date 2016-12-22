module.exports = {
  "bundles": {
    "dist/app-bundle": {
      "includes": [
        "[**/*.js]",
        "**/*.html!text",
        "**/*.css!text"
      ],
      "options": {
        "inject": true,
        "minify": true,
        "depCache": true,
        "rev": true
      }
    },
    "dist/vendor-bundle": {
      "includes": [
        "aurelia-framework",
        "aurelia-bootstrapper",
        "aurelia-fetch-client",
        "aurelia-router",
        "aurelia-animator-css",
        "aurelia-templating-binding",
        "aurelia-polyfills",
        "aurelia-templating-resources",
        "aurelia-templating-router",
        "aurelia-loader-default",
        "aurelia-history-browser",
        "aurelia-logging-console",
        "fetch",
        "jquery",
        "bootstrap",
        "bootstrap/css/bootstrap.css!text",
        "bootstrap-datepicker",
        "bootstrap-datepicker/dist/css/bootstrap-datepicker.standalone.min.css!text",
        "bootstrap-datepicker/dist/locales/bootstrap-datepicker.fr.min",
        "aurelia-validation",
        "aurelia-i18n",
        "i18next-xhr-backend"
      ],
      "options": {
        "inject": true,
        "minify": true,
        "depCache": false,
        "rev": true
      }
    }
  }
};
