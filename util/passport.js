'use strict'
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup = function () {
    passport.use('local-login',
        new LocalStrategy({
                usernameField: 'id',
                passwordField: 'password',
                passReqToCallback: true
            },
            function (req,  id, password, done) {
                db.each('SELECT * FROM CUSTOMER WHERE ID = ?',id, function (err, result) {
                  console.log(result.PASSWORD);
                  if(result.PASSWORD == password){
                    console.log('로그인성공');
                    return done(null, result);
                  }
                  else{
                    console.log('비번틀림');
                    return done(null, false);
                  }
                });
            }
        )
    )
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

}
