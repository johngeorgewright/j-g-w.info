var path         = require('path'),
    readDirFiles = require('read-dir-files'),
    helpers      = require('./helpers');

/*
 * GET home page.
 */
exports.index = function(req, res){
  res.render('index');
};

/**
 * GET protfolio
 */
exports.portfolio = function(req, res){
  res.render('portfolio');
};

/**
 * GET prices
 */
exports.prices = function(req, res){
  res.render('prices');
};

/**
 * GET robots.txt
 */
exports.robots = function(req, res){
  var resTxt = 'User-agent: *';

  if(!helpers.allowRobots()){
    resTxt += "\nDisallow: /";
  }
  
  res.type('text');
  res.send(resTxt);
};

/**
 * GET bootstrap javascripts
 */
exports.bootstrapJs = function(req, res){
  var dir = path.join(__dirname, 'node_modules', 'bootstrap', 'js');

  readDirFiles.read(dir, false, function(err, files){

    var data = '',
        filename;

    if(err){
      throw new Error(err);
    }

    for(filename in files){
      if(files.hasOwnProperty(filename)){
        data += files[filename].toString();
      }
    }

    res.type('js');
    res.send(data);

  });
};

