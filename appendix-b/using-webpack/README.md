# Contacts Management Application - Using Webpack

This is a sample of the Contacts Management Application used in the appendix A, built using the Webpack + ESNext skeleton.

## Prerequisites

1. Ensure that [NodeJS](http://nodejs.org/) is installed.
2. Restore the application's packages by running the following command from the project folder:
  ```shell
  npm install
  ```

## Running the Application

1. Launch the application by running the following command from the project folder:
  ```shell
  npm start
  ```
2. Launch the [API](../../api) in a separate console.
3. Open your favorite browser and navigate to [http://localhost:9000/](http://localhost:9000/).

## About the Unit tests

At the moment of writing, the ```ComponentTester``` from the ```aurelia-testing``` library
doesn't play well with the Webpack skeleton. As such, the unit tests for the ```resources```
feature have been excluded; in fact, only the ```contacts``` feature is included in the tests.
This can be changed by replacing the following line:
```js
var testContext = require.context('./unit/contacts', true, /\.spec\.(ts|js)/);
```
with this one:
```js
var testContext = require.context('./unit', true, /\.spec\.(ts|js)/);
```
in ```test/spec-bundle.js```.


## About the E2E Tests

At the moment of writing, some features of the Aurelia plugin for 
Protractor don't work well with the Webpack skeleton. As such, many
E2E test cases fail, while they pass in the CLI-based version.