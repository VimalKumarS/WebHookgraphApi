//import express from 'express';
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
//import path from 'path';
//import bodyParser from 'body-parser';
var authRouter = require('./routes/auth');
var listenRouter = require('./routes/listen');
//import { authRouter } from './routes/auth';
//import { listenRouter } from './routes/listen';
var dbHelper =require('./helpers/dbHelper');
var app = express();

const env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = (env === 'development');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRouter);
app.use('/listen', listenRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      title: 'error'
    });
  });
} else {
  // production error handler
  // no stacktraces leaked to user
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: { },
      title: 'error'
    });
  });
}
//create database
 dbHelper.createDatabase();
app.listen(3000, function() {
  console.log('Listening on port 3000...')
})

//http://localhost:3000/home.html?subscriptionId=e4f9db94-f282-410e-b412-8c5e63543d08&userId=vimalsinghal@bubble001.onmicrosoft.com
//https://docs.microsoft.com/en-us/outlook/rest/webhooks