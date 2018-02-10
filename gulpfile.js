let gulp = require("gulp");
let gulpBrowser = require("gulp-browser");

let transforms = [
    {
        transform: "babelify",
        options: {presets: ["es2015"]}
    }
];

gulp.task('gulpBrowser',function() {
    var stream = gulp.src('./src/index.js')
        .pipe(gulpBrowser.browserify(transforms)) // gulp.browserify() accepts an optional array of tansforms
        .pipe(gulp.dest("./build/"));
    return stream;
});

gulp.start("gulpBrowser");