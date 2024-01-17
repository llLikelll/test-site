'use strict';

import gulp from 'gulp'
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import watch from 'gulp-watch'
import rename from 'gulp-rename'
import cleanCSS from 'gulp-clean-css'
import sourcemaps from 'gulp-sourcemaps'
import rigger from 'gulp-rigger'
import uglify from 'gulp-uglify'
import pug from 'gulp-pug'
import autoprefixer from 'gulp-autoprefixer'
import browserSync from 'browser-sync'
import svgSprite from 'gulp-svg-sprite'

const sass = gulpSass(dartSass);

gulp.task('sass', function () {
    return gulp.src('scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('../assets/css/'))
        .pipe(browserSync.stream())
})

gulp.task('js', function () {
    return gulp.src('js/*.js')
        .pipe(sourcemaps.init())
        .pipe(rigger())
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('../assets/js/'))
});

gulp.task('fonts', function () {
    return gulp.src('fonts/**/*.*')
        .pipe(gulp.dest('../assets/fonts/'))
});

gulp.task('images', function () {
    return gulp.src('images/**/*.*')
        .pipe(gulp.dest('../assets/images/'))
});

gulp.task('favicons', function () {
    return gulp.src('favicons/**/*.*')
        .pipe(gulp.dest('../icons/'))
});

gulp.task('svgSprite', function () {
    return gulp.src('icons/*.svg')
        .pipe(svgSprite({
                mode: {
                    symbol: {
                        sprite: "../sprite.svg"
                    }
                },
            }
        ))
        .pipe(gulp.dest('../assets/icons/'));
});

gulp.task('pug', function () {
    return gulp.src('pug/*.pug')
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('../'))
})

gulp.task('watch', function () {
    browserSync.init({
        server: "../"
    });

    gulp.watch('pug/**/*.pug', gulp.series('pug'))
    gulp.watch('scss/**/*.scss', gulp.series('sass'))
    gulp.watch('js/**/*.js', gulp.series('js'))
    gulp.watch('images/**/*.*', gulp.series('images'))
    gulp.watch('favicons/**/*.*', gulp.series('favicons'))
    gulp.watch('fonts/**/*.*', gulp.series('fonts'))
    gulp.watch('icons/*.svg', gulp.series('svgSprite'))
    gulp.watch("../*.html").on('change', browserSync.reload);
});

gulp.task('default', gulp.series(['pug', 'sass', 'js', 'fonts', 'images', 'favicons', 'svgSprite'], 'watch'))
