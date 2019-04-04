var createError = require('http-errors');
var express = require('express');
var path = require('path');
var ejs = require('ejs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// body解析
const bodyParser = require('body-parser');


// pages
let router = require('./routes/router');

//server
// let user_server = require('./routes/user.server.route');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html',ejs.__express);
app.set('view engine', 'html');
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    "extended": "true",
    "limit": "2mb"
}));
app.use(bodyParser.json({ "limit": "2mb"}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// pages
app.use('/', router);
// server
// app.use('/user', userApi);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
