var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// load defined routers
var session = require('express-session');
var index = require('./routes/index');
var shortcodes = require('./routes/shortcodes');
var login = require('./routes/login');
var signin = require('./routes/signin');
var notice = require('./routes/notice');
var app = express();

mongoose.connect('mongodb://localhost/net_database')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


require('./auth/passport').setup();
app.use(session({ secret: 'secret',
resave: false,
saveUninitialized: false,
cookie: {
    maxAge: 1000 * 60 * 60
}
 }));



app.use(passport.initialize());
app.use(passport.session());

function IsAuthorized(req, res, next) {
    if (req.isAuthenticated())
        return next();
    else
        return res.redirect('/');

}

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  console.log("Connected to open server");
});
//configure passport
var User = require('./models/user');

// register routers in express


app.use('/', index);
app.use('/shortcodes',shortcodes);
app.use('/login',login);
app.use('/signin',signin);
app.use('/notice',notice);

var port = process.env.PORT || 3000;
// open a port
app.listen(3000, function(res,req){
	console.log("Server'S Open Now");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
