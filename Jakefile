desc('Runs the server.');
task('server', [], function(params){
  var app = require('./app');
  app.start();
});

namespace('compile', function(){

  desc('Compiles all less files.');
  task('less', [], function(params){
    var compiler = require('./compile');
    compiler.less();
  });

  desc('Compiles all js files.');
  task('js', [], function(){
    var compiler = require('./compile');
    compiler.js();
  });

  desc('Compiles all css and js files.');
  task('all', ['less', 'js']);

});

