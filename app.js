var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var csrf            = require("csurf");
var bodyParser      = require('body-parser');

var routes          = require('./routes/index');
var sessions        = require('./routes/session');
var users           = require('./routes/users');
var auth            = require('./routes/auth');
var register        = require('./routes/register');
var room            = require('./routes/room');
var mongo           = require('./routes/mongo');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.locals.pretty = true;

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    if (req.session && req.session.user) {
        mongo.Users.findOne({ email: req.session.user.email }, function(err, user) {
            if (user) {
                req.user = user;
                delete req.user.password;
                req.session.user = req.user;
                res.locals.user = req.user;
            }
            next();
        });
    } else {
        next();
    }
});

app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// Session
app.use(sessions.session);
app.use(csrf());

app.use('/', routes.index);
app.use('/users', users);
app.use('/room', room);
app.use('/auth', auth);
app.use('/register', register);
app.use('/logout', function(req, res, next) {
    req.session.reset();
    res.redirect('/auth');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.locals.pretty = false;
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;