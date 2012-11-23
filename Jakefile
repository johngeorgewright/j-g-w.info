desc('Runs the server.');
task('server', [], function(params){
  var app = require('./app');
  app.start();
});

namespace('compile', function(){

  desc('Compiles all less files.');
  task('less', [], function(params){
    var less = require('./less');
    less.compile();
  });

});

