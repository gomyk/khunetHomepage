var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res,next) {
  if(req.user){
    console.log("로그인되어있음 id : ",req.user.id);
  }
  res.render('index', { title: 'Express' });
});
module.exports = router;
