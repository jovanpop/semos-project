var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let recipesRouter = require('./routes/recipes');

mongoose.connect(`mongodb+srv://jovan:${process.env.MONGO_PW}@semos.snt5k.mongodb.net/meals?retryWrites=true&w=majority`)

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/recipes',recipesRouter);

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).redirect('/users/login')
    }
  });

module.exports = app;
