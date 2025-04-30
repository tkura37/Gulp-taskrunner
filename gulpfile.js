const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const uglify = require("gulp-uglify");
const plumber = require("gulp-plumber");
const browserSync = require("browser-sync");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");

const srcPath = {
  html: "src/*.html",
  scss: "src/scss/**/*.scss",
  js: "src/js/**/*.js",
};

const distPath = {
  html: "dist/",
  css: "dist/css/",
  js: "dist/js/",
};

/* .htmlをコピー */
function copyHtml() {
  return gulp
    .src(srcPath.html)
    .pipe(plumber())
    .pipe(gulp.dest(distPath.html))
    .pipe(browserSync.reload({ stream: true }));
}

/* .scssを処理
	- トランスパイル
	- ベンダープレフィックス追加
	- minify
	- SourceMap生成 
*/
function processScss() {
  return gulp
    .src(srcPath.scss)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass()) /* トランスパイル */
    .pipe(
      postcss([autoprefixer({ grid: true })])
    ) /* ベンダープレフィックス追加 */
    .pipe(gulp.dest(distPath.css))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(postcss([cssnano({ autoprefixer: false })])) /* minify */
    .pipe(sourcemaps.write("./")) /* SourceMap生成 */
    .pipe(gulp.dest(distPath.css))
    .pipe(browserSync.reload({ stream: true }));
}

/* .jsをminify */
function minifyJS() {
  return gulp
    .src(srcPath.js)
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest(distPath.js))
    .pipe(browserSync.reload({ stream: true }));
}

/* ファイルの変更を監視 */
function watch(done) {
  gulp.watch(srcPath.html, copyHtml);
  gulp.watch(srcPath.scss, processScss);
  gulp.watch(srcPath.js, minifyJS);
  done();
}

/* localhostサーバー初期化 */
function serve(done) {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });
  done();
}

exports.build = gulp.parallel(copyHtml, processScss, minifyJS);
exports.default = gulp.series(exports.build, gulp.parallel(serve, watch));
