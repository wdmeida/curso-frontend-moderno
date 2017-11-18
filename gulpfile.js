var gulp = require('gulp'),
    sass = require('gulp-sass'),
    include = require('gulp-file-include'),
    clean = require('gulp-clean'),
    browserSync = require('browser-sync');

gulp.task('clean', function() {
  // stream
  return gulp.src('dist')
             .pipe(clean())
})

gulp.task('copy', ['clean'], function() {
  gulp.src([
    'src/components/**/*',
    'src/css/**/*',
    'src/javascript/**/*',
    'src/imagens/**/*'
  ], {'base': 'src'})
      .pipe(gulp.dest('dist'))
})

gulp.task('sass', function() {
  gulp.src('./src/sass/**/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('./dist/css'));
})

gulp.task('html', function() {
  return gulp.src('./src/index.html')
             .pipe(include())
             .pipe(gulp.dest('./dist/'))
})

gulp.task('server', ['html'], function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })

  gulp.watch('./dist/**/*').on('change', browserSync.reload)

  gulp.watch('./src/sass/**/*.scss', ['sass'])
  gulp.watch('./src/**/*.html', ['html'])
})