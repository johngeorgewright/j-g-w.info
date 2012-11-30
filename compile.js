var less   = require('less'),
    path   = require('path'),
    rdf    = require('read-dir-files'),
    fs     = require('fs'),
    app    = require('./app'),
    source = app.get('less source'),
    dest   = app.get('less destination'),
    incs   = app.get('less include paths'),
    assert = require('assert'),
    Uglify = require('uglify-js');

exports.less = function(){

  rdf.read(source, function(err, files){

    var file, parser, filename, destFile;

    function parse(err, tree){
      if(err){
        return console.error(err);
      }

      var css = tree.toCSS({
            compress: true
          });

      fs.writeFile(path.join(dest, destFile), css, function(err){
        if(err){
          console.error(err);
        }
      });
    }
    
    if(err){
      return console.error(err);
    }

    for(file in files){
      if(files.hasOwnProperty(file) && file[0] !== '.'){

        destFile = path.basename(file, path.extname(file)) + '.css';

        console.log('Compiling %s > %s', file, destFile);

        parser = new less.Parser({
          paths    : incs,
          filename : path.join(source, file)
        });

        parser.parse(files[file].toString(), parse);

      }
    }

  });

};

exports.js = function(){
  var dir     = path.join(__dirname, 'node_modules', 'bootstrap', 'js'),
      outname = path.join(__dirname, 'public', 'javascripts', 'bootstrap-min.js'),
      files   = ['button'],
      output  = '';

  files = files.map(function(file){
    file = 'bootstrap-' + file + '.js';
    file = path.join(dir, file);
    return file;
  });

  output = Uglify.minify(files).code;

  fs.writeFile(outname, output, function(err){
    assert.ifError(err);
    console.log('Compiled JS');
  });
};

