const gulp = require("gulp")
const sass = require("gulp-sass")
const postcss = require("gulp-postcss")
const autoprefixer = require("autoprefixer")
const cssnano = require("cssnano")
const rename = require("gulp-rename")
const htmlmin = require("gulp-htmlmin")
const terser = require("gulp-terser-js")
var browserSync = require("browser-sync").create()

sass.compiler = require("node-sass")

gulp.task("minJS", function() {
  return gulp
    .src("./js/*.js")
    .pipe(
      terser({
        mangle: {
          toplevel: true
        }
      })
    )
    .on("error", function(error) {
      this.emit("end")
    })
    .pipe(
      rename(function(path) {
        path.extname = ".min.js"
      })
    )
    .pipe(gulp.dest("./build/js"))
})

gulp.task("minHTML", function() {
  return gulp
    .src("./*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(
      rename(function(path) {
        path.extname = ".min.html"
      })
    )
    .pipe(gulp.dest("./build"))
})

gulp.task("sass", function() {
  return gulp
    .src("./scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./css"))
})

gulp.task("postcss", function() {
  let plugins = [autoprefixer(), cssnano]
  return gulp
    .src("./css/**/*.css")
    .pipe(postcss(plugins))
    .pipe(
      rename(function(path) {
        path.extname = ".min.css"
      })
    )
    .pipe(gulp.dest("./build/css"))
})

gulp.task(
  "default",
  gulp.parallel("minHTML", "minJS", gulp.series("sass", "postcss"))
)

gulp.task("watch", function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  })
  console.log("Gulp is watching...")
  gulp
    .watch("./*.html", gulp.series("minHTML"))
    .on("change", browserSync.reload)
  gulp.watch("./js/*.js", gulp.series("minJS")).on("change", browserSync.reload)
  gulp
    .watch("./scss/**/*.scss", gulp.series("sass", "postcss"))
    .on("change", browserSync.reload)
})
