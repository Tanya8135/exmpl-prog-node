const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

process.env.SECRET_KEY;
process.env.NODE_ENV;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev')); /* блок ПЗ */
app.use(express.json()); /* блок ПЗ */
app.use(express.urlencoded({ extended: false })); /* блок ПЗ */
app.use(cookieParser()); /* блок ПЗ */
app.use(express.static(path.join(__dirname, 'public'))); /* обработка статических файлов */

app.use('/', indexRouter);
app.use('/users', usersRouter);

// обработка не существующего роута или 404
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler сам процесс обработки 404 или не существу.роута
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
