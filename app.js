var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const database=require('./config/db')
const mongoose = require('mongoose');
const cors=require('cors');
const dotenv= require('dotenv');
dotenv.config();


const adminRouter = require('./routes/admin');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const paymentRouter = require('./routes/payment');
database()
var app = express();
 app.use(cors({
  origin:'http://localhost:5173'
 }))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/payment', paymentRouter);

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
