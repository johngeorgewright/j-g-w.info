desc('Runs the server.');
task('server', [], function(params){
  var http = require('http'),
      app  = require('./app');

  http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
  });
});

namespace('compile', function(){

  desc('Compiles all less files.');
  task('less', [], function(params){
    var less = require('./less');
    less.compile();
  });

});

