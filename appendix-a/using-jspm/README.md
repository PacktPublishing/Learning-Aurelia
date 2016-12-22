# Contacts Management Application - Using JSPM & SystemJS

This is a sample of the Contacts Management Application used in the appendix B, built using the JSPM + SystemJS + ESNext skeleton.

## Prerequisites

1. Ensure that [NodeJS](http://nodejs.org/) is installed.
2. Restore the application's development packages by running the following command from the project folder:
  ```shell
  npm install
  ```
3. If [Gulp](http://gulpjs.com/) is not globally installed, run the following command:
  ```shell
  npm install gulp -g
  ```
4. If [jspm](http://jspm.io/) is not globally installed, run the following command:
  ```shell
  npm install jspm -g
  ```
  > **Note:** jspm queries GitHub to install semver packages, but GitHub has a rate limit on anonymous API requests. It is advised that you configure jspm with your GitHub credentials in order to avoid problems. You can do this by executing `jspm registry config github` and following the prompts. If you choose to authorize jspm by an access token instead of giving your password (see GitHub `Settings > Personal Access Tokens`), `public_repo` access for the token is required.
5. Restore the application's packages by running the following command from the project folder:
  ```shell
  jspm install -y
  ```
  >**Note:** Windows users, if you experience an error of "unknown command unzip" you can solve this problem by doing `npm install -g unzip` and then re-running `jspm install`.

## Running The Application

1. Launch the application by running the following command from the project folder:
  ```shell
  gulp watch
  ```
2. Launch the [API](../../api) in a separate console.
3. Open your favorite browser and navigate to [http://localhost:9000/](http://localhost:9000/).
