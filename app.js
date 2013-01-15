var express  = require('express')
  , routes   = require('./routes')
  , http     = require('http')
  , path     = require('path')
  , app      = express()
  , locals   = require('./locals')
  , less     = require('less-middleware')
  , helpers  = require('./helpers')
  , os       = require('os')
  , username = process.env.AUTH_USER
  , password = process.env.AUTH_PASS;
  
app.configure(function(){
  var bootstrapPath = path.join(__dirname, 'node_modules', 'bootstrap');
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('less source', path.join(__dirname, 'assets', 'less'));
  app.set('less include paths', [path.join(bootstrapPath, 'less')]);
  app.set('less destination', path.join(__dirname, 'public', 'stylesheets'));
  app.set('less prefix', '/stylesheets');
  if(username && password){
    app.use(express.basicAuth(username, password));
  }
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use('/img', express['static'](path.join(bootstrapPath, 'img')));
  app.locals.allowRobots = helpers.allowRobots();
  app.use(locals);
  app.use(app.router);
});

app.configure('development', function(){
  app.use(less({
    src    : app.get('less source'),
    paths  : app.get('less include paths'),
    dest   : app.get('less destination'),
    prefix : app.get('less prefix'),
    debug  : true
  }));
  app.use(express['static'](path.join(__dirname, 'public')));
  app.use(express.errorHandler());
  app.get('/javascripts/bootstrap-min.js', routes.bootstrapJs);
});

app.configure('production', function(){
  var tmpDir = os.tmpDir();
  app.set('less destination', tmpDir);
  app.use(less({
    src    : app.get('less source'),
    paths  : app.get('less include paths'),
    dest   : app.get('less destination'),
    prefix : app.get('less prefix')
  }));
  app.use(express['static'](path.join(__dirname, 'public')));
  app.use(express['static'](tmpDir));
});

app.get('/', routes.index);
app.get('/robots.txt', routes.robots);
app.get('/portfolio', routes.portfolio);
app.get('/technologies', routes.tech);
app.get('/prices', routes.prices);
app.get('/professional-background', routes.career);

app.start = function(){
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
};

module.exports = app;

