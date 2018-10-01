/*
gulp --filename trashmountain.png --project give /
gulp --filename doulos.png --project giveDoulos /
*/
``

var gulp = require('gulp');
var rename = require('gulp-rename');
var spawn = require('child_process').spawn;
var log = require('fancy-log');
var minimist = require('minimist');
var colors = require('ansi-colors');
var knownOptions = {
  string: ['filename', 'project'],
};

var options = minimist(process.argv.slice(2), knownOptions);

gulp.task('default', function(){
  console.log("Tasked");
  console.log(options.filename);
  console.log(options);
  gulp.src('./' + [options.filename])
      .pipe(rename('/Users/frank/Dev/give/public/images/favicon111.png'))
      .pipe(gulp.dest('/'));
  //
  var child = spawn("mup", ['deploy'], {cwd: '/Users/frank/Dev/newMup/' + [options.project]}),
      stdout = '',
      stderr = '';

  child.stdout.setEncoding('utf8');

  child.stdout.on('data', function (data) {
      stdout += data;
      log(data);
  });

  child.stderr.setEncoding('utf8');
  child.stderr.on('data', function (data) {
      stderr += data;
      log(colors.red(data));
  });

  child.on('close', function(code) {
      log("Done with exit code", code);
      return 'Done';
  });
});
