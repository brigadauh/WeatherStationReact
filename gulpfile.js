var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    webserver = require('gulp-webserver');

var src = './src',
    app = './builds/app';

gulp.task('js', function() {
  return gulp.src( src + '/js/app.js' )
    .pipe(browserify({
      transform: 'reactify',
      debug: true
    }))
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(gulp.dest(app + '/js'));
});

gulp.task('html', function() {
  gulp.src( src + '/**/*.{html,json}')
  .pipe(gulp.dest( app ));
});
gulp.task('javascripts', function() {
  gulp.src( src + '/javascripts/**/*.js')
  .pipe(gulp.dest( app +'/javascripts'));
});
gulp.task('images', function() {
  gulp.src( src + '/images/**/*.*')
  .pipe(gulp.dest( app + '/images'));
});

gulp.task('css', function() {
  gulp.src( src + '/css/**/*.css')
  .pipe(gulp.dest( app +'/css'));
});

gulp.task('watch', function() {
  gulp.watch( src + '/javascripts/**/*.*', ['javascripts']);
  gulp.watch( src + '/js/**/*.js', ['js']);
  gulp.watch( src + '/images/**/*.*', ['images']);
  gulp.watch( src + '/css/**/*.css', ['css']);
  gulp.watch([ src + '/**/*.html'], ['html']);
});

gulp.task('webserver', function() {

  gulp.src( app )
    .pipe(webserver({
        livereload: true,

        port:8001,
        proxies:[
                {
                    source:'/api',
                    target:'http://192.168.1.3:8888/api'
                }
            ]
    }));
});

gulp.task('default', [ 'watch', 'html', 'js','javascripts', 'css','images', 'webserver']);
