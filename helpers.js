exports.allowRobots = function(){
  var allow = process.env.ALLOW_ROBOTS;
  if(allow === undefined){
   allow = true;
  }
  else if(allow === 'false' || allow === '0'){
    allow = false;
  }
  return allow;
};

