var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync');

gulp.task('sass', function() {
  gulp.src('./src/sass/**/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('./src/css'));
})

gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    }
  })

  gulp.watch('./src/css/*.css').on('change', browserSync.reload)

  gulp.watch('./src/sass/**/*.scss', ['sass'])
})