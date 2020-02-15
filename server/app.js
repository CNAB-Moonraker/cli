var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var claimsRouter = require('./routes/claims')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/claims', claimsRouter);

// catch any other request and send 404
app.all('*', function (req, res, next) {
  res.sendStatus(404);
});

module.exports = app;
