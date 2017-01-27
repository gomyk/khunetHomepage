'use strict';
var passport = require('passport');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res,next) {
  res.render('login', { title: 'Express' });
});

// 로그인 라우팅 POST /login
router.post('/', function (req, res, next) {
        if (req.body.id.length == 0 || req.body.password.length == 0) {
            //    res.redirect('/login');
        } else {
            next();
        }
    }, passport.authenticate('local-login', {
        successRedirect : '/',
        failureRedirect: '/login',
        failureFlash: false
    }), function (req, res) {
      //  res.send('/', { title: 'Express',user:req.user});
      console.log("dfdfd");
  }
);



module.exports = router;
