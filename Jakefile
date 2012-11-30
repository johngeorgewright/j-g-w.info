var child = require('child_process'),
    async = require('async');

function run(command, cb){
  var spawn = child.spawn(command);
  spawn.stdout.pipe(process.stdout);
  spawn.stderr.on('data', function(err){
    spawn.removeAllListeners('exit');
    cb(err);
  });
  spawn.on('exit', function(code, signal){
    console.log('$ %s', command);
    if(!code){
      cb(signal);
    }
    else{
      cb();
    }
  });
}

desc('Runs the server.');
task('server', [], function(params){
  var app = require('./app');
  app.start();
});

desc('Deploys the site to a server.');
task('deploy', [], function(){
  var server = process.env.server || 'qa',
      tag    = process.env.tag,
      branch = process.env.branch,
      master = false,
      comms  = [];

  if(['qa', 'production'].indexOf(server) < 0){
    return console.error('Server %s is not configured', server);
  }

  if(!tag || !branch){
    master = true;
  }

  if(master){
    comms.push('git checkout master');
  }
  else if(branch){
    comms.push('git checkout ' + branch);
  }

  comms.push('./deploy_hook');

  comms.push('git add public/stylesheets');
  comms.push('git add public/javascripts');
  comms.push('git commit -m "Compiling assets"');

  if(tag){
    comms.push('git tag ' + tag);
  }

  comms.push('git push ' + server + ' ' + (tag ? tag+':' : '') + 'master');

  comms = comms.map(function(comm){
    return function(cb){
      run(comm, cb);
    }
  });

  async.series(comms, function(err){
    if(err){
      console.error('Error %s', err);
    }
  });
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

