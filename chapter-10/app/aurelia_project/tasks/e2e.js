import gulp from 'gulp';
import del from 'del';
import {webdriver_update, protractor} from 'gulp-protractor';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import changedInPlace from 'gulp-changed-in-place';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import project from '../aurelia.json';
import {CLIOptions} from 'aurelia-cli';

function clean() {
  return del(project.e2eTestRunner.output + '*');
}

function build() {
  return gulp.src(project.e2eTestRunner.source)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(changedInPlace({firstPass:true}))
    .pipe(sourcemaps.init())
    .pipe(babel(project.e2eTestRunner.transpiler.options))
    .pipe(gulp.dest(project.e2eTestRunner.output));
}

function run() {
  return gulp.src(project.e2eTestRunner.output + '**/*.js')
    .pipe(protractor({
      configFile: 'protractor.conf.js',
      args: ['--baseUrl', 'http://127.0.0.1:9000']
    }))
    .on('end', () => { process.exit(); })
    .on('error', e => { throw e; });
}

export default gulp.series(
  webdriver_update,
  clean,
  build,
  run
);
