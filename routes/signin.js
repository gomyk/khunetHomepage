var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req, res,next) {
  res.render('signin', { title: 'Express' });
});

router.post('/', function(req, res){

	var user = new User();
	user.id = req.body.id;
	user.password = req.body.password;
  user.name = req.body.name;
  user.student_id = req.body.student_id;

  console.log(user.id);
	user.save(function(err){
		if(err){
			console.log(err);
			return res.status(500).json({ error: 'database failure'});;
        res.render('sign_in');
		}else{
      res.render('index');
    }
	});
});

module.exports = router;
