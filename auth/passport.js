'use strict'
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
exports.setup = function () {
  passport.use('local-login', new LocalStrategy({
  usernameField: 'id',
  passwordField: 'password',
  passReqToCallback: true,
},
function(req, id, password, done) {
  User.findOne({ 'id':  id }, function(err, user) {
    if (err)
        return done(err);
    if (!user)
        return done(null, false);
    if (!user.validPassword(password))
        return done(null, false);
    return done(null, user);
  });
}));
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

}
