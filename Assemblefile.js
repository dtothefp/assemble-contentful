var path = require('path');
var assemble = require('assemble');
var ext = require('gulp-extname');
var contentful = require('./utils/plugins/contentful');
var src = path.join(__dirname, 'src');

function generateKey(fp) {
  var split = fp.split('/');
  var base = path.basename(fp, path.extname(fp));
  var dirname = split[split.length - 2];
  return path.join(dirname, base);
}

assemble.layouts(path.join(src, 'layouts/**/*.hbs'));
console.log('LAYOUTS', path.join(src, 'layouts/**/*.hbs'));
assemble.option('renameKey', generateKey);

assemble.task('pages', function() {
  var pages = path.join(src, 'pages/**/*.hbs');
  return assemble.src(pages)
    .on('error', function (err) {
      console.log('src error', err);
    })
    .on('data', function(file) {
      console.log('rendering %s', generateKey(file.path));
    })
    .on('end', function () {
      console.log('finished rendering pages');
    })
    .pipe(contentful(assemble))
    .pipe(ext())
    .pipe(assemble.dest(path.join('dist/')))
});

assemble.run(['pages'], function(err) {
  if(err) console.log(err);
});
