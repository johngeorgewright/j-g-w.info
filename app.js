var express = require('express')
  , routes  = require('./routes')
  , http    = require('http')
  , path    = require('path')
  , app     = express()
  , locals  = require('./locals')
  , less    = require('less-middleware')
  , helpers = require('./helpers');
  
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('less source', path.join(__dirname, 'assets', 'less'));
  app.set('less include paths', [path.join(__dirname, 'node_modules', 'bootstrap', 'less')]);
  app.set('less destination', path.join(__dirname, 'public', 'stylesheets'));
  app.set('less prefix', '/stylesheets');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
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
  app.use(less({
    src      : app.get('less source'),
    paths    : app.get('less include paths'),
    dest     : app.get('less destination'),
    prefix   : app.get('less prefix'),
    compress : true
  }));
  app.use(express['static'](path.join(__dirname, 'public')));
});

app.get('/', routes.index);
app.get('/robots.txt', routes.robots);
app.get('/portfolio', routes.portfolio);
app.get('/prices', routes.prices);

app.start = function(){
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
};

module.exports = app;

