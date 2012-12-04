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
 * GET career
 */
exports.career = function(req, res){
  res.render('career');
};

/**
 * GET robots.txt
 */
exports.robots = function(req, res){
  res.type('text');
  res.render('robots');
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
      if(files.hasOwnProperty(filename) && filename[0] !== '.'){
        data += files[filename].toString();
      }
    }

    res.type('js');
    res.send(data);

  });
};

