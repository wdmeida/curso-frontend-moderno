var gulp = require('gulp'),
    sass = require('gulp-sass'),
    include = require('gulp-file-include'),
    browserSync = require('browser-sync');

gulp.task('sass', function() {
  gulp.src('./src/sass/**/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('./src/css'));
})

gulp.task('html', function() {
  gulp.src('./src/index.html')
      .pipe(include())
      .pipe(gulp.dest('./dist/'))
})

gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })

  gulp.watch('./src/**/*').on('change', browserSync.reload)

  gulp.watch('./src/sass/**/*.scss', ['sass'])
})