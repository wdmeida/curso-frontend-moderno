var gulp = require('gulp'),
    sass = require('gulp-sass');

gulp.task('sass', function() {
  gulp.src('./src/sass/**/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('./src/css'));
})

gulp.task('listen', function() {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
})