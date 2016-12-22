exports.config = {
  directConnect: true,

  capabilities: {
    'browserName': 'chrome'
  },

  specs: ['test/e2e/dist/**/*.js'],

  plugins: [{
    package: 'aurelia-tools/plugins/protractor'
  }],

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};
