const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

gulp.task('default', ['clean'], () =>  {
    gulp.start('build');
});

gulp.task('build', ['copy', 'styles', 'images', 'scripts'], () => {
    console.log('build done');
});

gulp.task('clean', () => {
    return gulp.src(['./docs'], { read: false })
        .pipe($.clean());
});

gulp.task('copy', () => {
  	return gulp.src(['app/**/*.html', 'app/robots.txt'])
    	.pipe(gulp.dest('./docs'));
});

gulp.task('styles', () => {
    return gulp.src('app/css/app.scss')
        .pipe($.sass())
        .pipe($.autoprefixer('last 2 version'))
        .pipe($.csso())
        .pipe($.rename('main.css'))
        .pipe(gulp.dest('./docs/css'));
});

gulp.task('images', () => {
	return gulp.src('app/img/*')
		.pipe($.imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest('./docs/img'));
});

gulp.task('scripts', () => {
    return gulp.src(['app/js/**/*.js'])
        .pipe($.concat('main.js'))
        .pipe($.uglify())
        .pipe(gulp.dest('./docs/js'));
});

gulp.task('connect', function() {
    $.connect.server({
        root: 'app',
        port: 8000,
        livereload: true
    });
});

gulp.task('serve', ['connect']);
