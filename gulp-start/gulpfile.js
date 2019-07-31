const gulp = require("gulp");
const sass = require("gulp-sass");
sass.compiler = require('node-sass');
const concat = require("gulp-concat");
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const zip = require('gulp-zip');
const cache = require("gulp-cache");
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');

gulp.task("html", (done) => {
    return gulp.src("./src/*.html")
        .pipe(gulp.dest("./dist"))
        .pipe(browserSync.stream());
});

gulp.task("images", (done) => {
    return  gulp.src("./src/img/**/*")
        .pipe(cache(imagemin({
            interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
        .pipe(gulp.dest("./dist/img"))
        .pipe(browserSync.stream());
});

gulp.task("scss", (done) => {
    return gulp.src("./src/scss/**/*.scss")
        .pipe(sass().on(`error`, sass.logError))
        .pipe(autoprefixer(['last 15 versions'], { cascade: true }))
        .pipe(gulp.dest("./dist/css"))
        .pipe(browserSync.stream());
});

gulp.task("browser-init", (done) =>{
   return browserSync.init({
        server: "./dist"
    });
});

gulp.task("watch", (done) =>{
    gulp.watch("./src/*.html", gulp.series("html"));
    gulp.watch("./src/scss/**/*.scss", gulp.series("scss"));
    gulp.watch("./src/js/**/*.js", gulp.series("js"));
    gulp.watch("./src/img/**/*", gulp.series("images"));
    return
})


gulp.task("js", (done) => {
    return gulp.src("./src/js/**/*.js")
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat("index.js"))
        .pipe(gulp.dest("./dist/js"))
        .pipe(browserSync.stream());
});

gulp.task('deploy', (done) => {
    return gulp.src('./dist/**/*')
        .pipe(zip('deploy.zip'))
        .pipe(gulp.dest('dist'));
});
gulp.task("clean",() =>{
    return del.sync("dist");
});



gulp.task("default", gulp.series("html", "scss", "js", "images", "browser-init", "watch"));