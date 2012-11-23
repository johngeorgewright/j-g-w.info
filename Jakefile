namespace('compile', function(){

  desc('Compiles all less files.');
  task('less', [], function(params){

    var less   = require('less'),
        path   = require('path'),
        rdf    = require('read-dir-files'),
        fs     = require('fs'),
        source = path.join(__dirname, 'assets', 'less'),
        dest   = path.join(__dirname, 'public', 'stylesheets'),
        incs   = [path.join(__dirname, 'node_modules', 'bootstrap', 'less')];

    console.log('Source        : %s', source);
    console.log('Destination   : %s', dest);
    console.log('Include paths : %s', incs.join(':'));

    rdf.read(source, function(err, files){

      var file, parser, filename;
      
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

          parser.parse(files[file].toString(), function(err, tree){
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
          });

        }
      }
    
    });

  });

});

