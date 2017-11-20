var gulp = require('gulp'),
    sass = require('gulp-sass'),
    include = require('gulp-file-include'),
    clean = require('gulp-clean'),
    uncss = require('gulp-uncss'),
    autoPrefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync');

// Clean directory
gulp.task('clean', function() {
  // stream
  return gulp.src('dist')
             .pipe(clean())
})

// Copy files of src directory to dist
gulp.task('copy', ['clean'], function() {
  gulp.src([
    'src/components/**/*',
    'src/css/**/*',
    'src/javascript/**/*',
    'src/imagens/**/*'
  ], {'base': 'src'})
      .pipe(gulp.dest('dist'))
})

// Compile sass files
gulp.task('sass', function() {
  gulp.src('./src/sass/**/*.scss')
      .pipe(sass())
      .pipe(autoPrefixer())
      .pipe(gulp.dest('./dist/css'));
})

// Include templates in html files
gulp.task('html', function() {
  return gulp.src('./src/**/*.html')
             .pipe(include())
             .pipe(gulp.dest('./dist/'))
})

// Clears unused bootstrap and font-awesome classes
gulp.task('uncss', ['html'], function() {
  return gulp.src('./dist/components/**/*.css')
             .pipe(uncss({
               html: ['./dist/*.html']
             }))
             .pipe(gulp.dest('./dist/components/'))
})

// Initializes a server that monitors changes.
gulp.task('server', ['uncss'], function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })

  gulp.watch('./dist/**/*').on('change', browserSync.reload)

  gulp.watch('./src/sass/**/*.scss', ['sass'])
  gulp.watch('./src/**/*.html', ['html'])
})