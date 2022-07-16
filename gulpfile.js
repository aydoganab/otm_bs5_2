let gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    csso=require('gulp-csso'),
    concat=require('gulp-concat'),
    rename=require('gulp-rename'),
    browserSync = require('browser-sync').create();


gulp.task('sass', function () {
    return gulp.src('./scss/style.scss')
        .pipe(sass())
        .pipe(autoprefixer({browserlist: [">= 1%", "last 1 major version", "not dead", "Chrome >= 60", "Firefox >= 60", "Edge >= 16", "iOS >= 10", "Safari >= 10", "Android >= 6", "not Explorer <= 11"]}))
        //.pipe(csso({comments:false}))
        .pipe(rename('otm_bs5_2.css'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('js', function () {
    return gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/@popperjs/core/dist/umd/popper.js', 'node_modules/bootstrap/dist/js/bootstrap.js'])
        //.pipe(uglify())
        .pipe(concat('otm_bs5.js'))
        .pipe(gulp.dest("app/js"))
        //.pipe(gulp.dest("../otmnew/o/js"))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('fa', function () {
    return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
        .pipe(gulp.dest("app/fonts"))
        //.pipe(gulp.dest("../otmnew/o/fonts"))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: ['./app'],
            index: 'index.html',
            watchEvents: ["add", "change", 'unlink']
        }
    });
});

gulp.task('watch', function () {
    gulp.watch('scss/*.scss', gulp.series('sass'));
    gulp.watch("app/*.html").on("change", browserSync.reload);
});

//DEFAULT
gulp.task('default', gulp.series('sass', 'js', 'fa', gulp.parallel('browserSync', 'watch')));