//first connect to the DB
require('./db/Mongo');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const commentRouter = require('./routes/comment');
const app = express();

const skip = (req, res) => res.statusCode < 400;

app.use(helmet());
app.use(logger('combined', {skip: skip}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(function (req, res, next) {
    // Allowed websites
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Allowed request methods
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    // Allowed request headers
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/comment', commentRouter);

module.exports = app;
