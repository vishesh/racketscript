const gulp = require('gulp');
const babel = require('gulp-babel');
const replace = require('gulp-replace');
const uglify = require('gulp-uglify');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
//const BabiliPlugin = require("babili-webpack-plugin");

const target = "~a" + ".rkt.js";

gulp.task('transform', function() {
    return gulp.src(['./**/*.js',
		     '!./node_modules/**',
		     '!./dist/**',
		     '!./*.js'])
	.pipe(webpackStream({
	    watch: false,
	    module: {
		loaders: [
		    {
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel-loader',
			query: {
			    presets: ["env"],
			}
		    }
		]

	    },
	    plugins: [new webpack.optimize.UglifyJsPlugin()
		      /* new BabiliPlugin() (BabaliWebpackPlugin) */],
	    output: {
		filename: 'compiled.js'
	    }
	}))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', gulp.series('transform', function () {}));

gulp.task('default', gulp.series('build', function () {}));
