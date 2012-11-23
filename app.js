var express = require('express')
  , routes  = require('./routes')
  , http    = require('http')
  , path    = require('path')
  , app     = express()
  , less    = require('less-middleware');
  
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(less({
    src    : path.join(__dirname, 'assets', 'less'),
    paths  : path.join(__dirname, 'node_modules', 'bootstrap', 'less'),
    dest   : path.join(__dirname, 'public', 'stylesheets'),
    prefix : '/stylesheets',
    debug  : true
  }));
  app.use(express['static'](path.join(__dirname, 'public')));
  app.use(express.errorHandler());
  app.get('/javascripts/bootstrap-min.js', routes.bootstrapJs);
});

app.configure('production', function(){
  app.use(less({
    src      : path.join(__dirname, 'assets', 'less'),
    paths    : path.join(__dirname, 'node_modules', 'bootstrap', 'less'),
    dest     : path.join(__dirname, 'public', 'stylesheets'),
    prefix   : '/stylesheets',
    compress : true
  }));
  app.use(express['static'](path.join(__dirname, 'public')));
});

app.get('/', routes.index);
app.get('/portfolio', routes.portfolio);
app.get('/prices', routes.prices);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

