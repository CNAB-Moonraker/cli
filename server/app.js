var createError = require('http-errors');
const fs = require('fs');
const os = require('os');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var claimsRouter = require('./routes/claims')

var app = express();
const moonrakerDir = path.resolve(os.homedir(), '.moonraker');
let webDistFolder = null;
if (fs.existsSync(moonrakerDir)){
  const data = fs.readFileSync(path.resolve(moonrakerDir, 'config.json'));
  webDistFolder = path.resolve(moonrakerDir, JSON.parse(data).webDistFolder);
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
if(webDistFolder !== null) {
  app.use(express.static(webDistFolder));
}

app.use('/', indexRouter);
app.use('/claims', claimsRouter);

// catch any other request and send 404
app.all('*', function (req, res, next) {
  res.sendStatus(404);
});

module.exports = app;