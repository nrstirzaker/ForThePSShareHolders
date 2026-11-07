const gulp = require('gulp')
const shell = require('gulp-shell')

gulp.task('astroBuild', shell.task('astro build'))




function defaultTask(cb) {
    // place code for your default task here
    cb();
}

exports.default = defaultTask