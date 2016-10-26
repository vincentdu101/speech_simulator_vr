var gulp = require("gulp");
var clean = require("gulp-clean");

gulp.task("clean-gz-files", function() {
    return gulp.src("www/node_modules/**/*.gz", {force: true})
            .pipe(clean());
});