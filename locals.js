module.exports = function(req, res, next){
  res.locals.isRoute = function(route){
    return route === req.url;
  };
  next();
};

