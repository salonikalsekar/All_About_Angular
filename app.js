var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var handlebars= require("handlebars");
var book_inside = require('./routes/book');
var app = express();
const exhbs = require("express-handlebars");
nodeMailer = require('nodemailer');
EmailTemplate = require('email-templates').EmailTemplate,
Promise = require('bluebird');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/books', express.static(path.join(__dirname, 'dist')));
app.use('/book', book_inside);
app.use('/verify', book_inside);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
//Set View Engine

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/mean-angular5', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

module.exports = app;