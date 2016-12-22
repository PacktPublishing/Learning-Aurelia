import gulp from 'gulp';
import build from './build';
import copy from './copy';

export default gulp.series(
  build,
  copy
);
