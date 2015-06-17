var through = require('through2');

module.exports = function(assemble) {

  return through.obj(function(file, enc, cb) {
    console.log(Object.keys(assemble.views));

    this.push(file);
    cb();
  });
};
