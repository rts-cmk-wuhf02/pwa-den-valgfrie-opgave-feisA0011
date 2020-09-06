const gulp = require("gulp");
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");
const connect = require("gulp-connect");
const sass = require("gulp-sass");
const babel = require("gulp-babel");
const imagemin = require("gulp-imagemin");


sass.compiler = require("node-sass");


function html(next) {
    gulp.src("./src/html/templates/*.ejs")
        .pipe(ejs().on("error", (err) => { console.log(err); }))
        .pipe(rename(function (path) {
            if (path.basename !== "index") {
                path.dirname = path.basename;
                path.basename = "index";
            }

            path.extname = ".html";
        }))
        .pipe(gulp.dest("./dist/"))
        .pipe(connect.reload());

    next();
}

function images(next) {
    gulp.src("./src/images/*")
        .pipe(imagemin())
        .pipe(gulp.dest("./dist/assets/images/"))
        .pipe(connect.reload());

    next();
}
function icons(next) {
    gulp.src("./src/icons/*")
        .pipe(imagemin())
        .pipe(gulp.dest("./dist/assets/icons/"))
        .pipe(connect.reload());

    next();
}

function scss(next) {
    gulp.src("./src/css/**/*.scss")
        .pipe(sass().on("error", err => console.log(err)))
        .pipe(gulp.dest("./dist/assets/css"))
        .pipe(connect.reload());

    next();
}

function js(next) {
    gulp.src("./src/js/**/*.js")
        /*.pipe(babel({
            presets: ['@babel/env']
        }).on("error", err => console.log(err)))*/
        .pipe(gulp.dest("./dist/assets/js"))
        .pipe(connect.reload());

    next();
}



function json(next) {
    gulp.src("./src/json/*.json")
        .pipe(gulp.dest("./dist/data"))
        .pipe(connect.reload());

    next();

}

function manifest(next) {
    gulp.src('./src/manifest/manifest.webmanifest')
        .pipe(gulp.dest('./dist/manifest.webmanifest'))
        .pipe(connect.reload());
    next()
}
function serviceWorker(next) {
    gulp.src('./src/*.js')
        .pipe(gulp.dest('./dist/'))
        .pipe(connect.reload())
    next()
}


// Watchers
function watchServiceWorker() {
    gulp.watch('./src/*.js', { ignoreInitial: false }, serviceWorker)
}

function watchManifest() {
    gulp.watch('./src/manifest/manifest.webmanifest', { ignoreInitial: false }, manifest);
}


function watchHtml() {
    gulp.watch("./src/html/**/*.ejs", { ignoreInitial: false }, html);
}

function watchImages() {
    gulp.watch("./src/images/*", { ignoreInitial: false }, images);
}

function watchIcons() {
    gulp.watch("./src/icons/*", { ignoreInitial: false }, icons);
}

function watchScss() {
    gulp.watch("./src/css/**/*.scss", { ignoreInitial: false }, scss);
}

function watchJs() {
    gulp.watch("./src/js/**/*.js", { ignoreInitial: false }, js);
}


function watchJson() {
    gulp.watch("./src/json/*.json", { ignoreInitial: false }, json);
}

gulp.task("dev", function (next) {
    watchHtml();
    watchImages();
    watchIcons();
    watchServiceWorker()
    watchScss();
    watchJs();
    watchJson();
    connect.server({
        livereload: true,
        root: "dist"
    });
    watchManifest()

    next();
});

gulp.task("build", function (next) {
    js(next);
    json(next);
    scss(next);
    images(next);
    icons(next);
    html(next);
    manifest(next);
    serviceWorker(next);
    next();
});