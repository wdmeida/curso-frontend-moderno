var gulp = require('gulp'),
    sass = require('gulp-sass'),
    include = require('gulp-file-include'),
    clean = require('gulp-clean'),
    uncss = require('gulp-uncss'),
    autoPrefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync');

// Clean directory
gulp.task('clean', function() {
  // stream
  return gulp.src('dist')
             .pipe(clean())
})

// Copy files of src directory to dist
gulp.task('copy', ['clean'], function() {
  return gulp.src([
                    'src/components/**/*'
                  ], {'base': 'src'})
                      .pipe(gulp.dest('dist'))
})

// Compile sass files
gulp.task('sass', function() {
  return gulp.src('./src/sass/**/*.scss')
      .pipe(sass())
      .pipe(autoPrefixer())
      .pipe(cssnano())
      .pipe(gulp.dest('./dist/css'));
})

// Include templates in html files
gulp.task('html', function() {
  return gulp.src([
    './src/**/*.html',
    '!./src/inc/**'
  ])
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

// Compressed images files
gulp.task('imagemin', function() {
  return gulp.src('./src/imagens/**/*')
             .pipe(imagemin())
             .pipe(gulp.dest('./dist/imagens'))
})

gulp.task('build-js', function() {
  return gulp.src('src/javascript/**/*')
      .pipe(concat('app.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./dist/javascript/'))
})

gulp.task('default', ['copy'], function() {
  gulp.start('uncss', 'imagemin', 'sass', 'build-js')
})

// Initializes a server that monitors changes
gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })

  gulp.watch('./dist/**/*').on('change', browserSync.reload)

  gulp.watch('./src/sass/**/*.scss', ['sass'])
  gulp.watch('./src/**/*.html', ['html'])
  gulp.watch('src/javascript/**/*', ['build-js'])
})