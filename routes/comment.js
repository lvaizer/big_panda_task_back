const express = require('express');
const router = express.Router();
const Response = require('../models/Response');
const CommentsController = require('../controllers/CommentsController');

/**
 * post new comment
 * **/
router.post('/', function (req, res, next) {
    CommentsController
        .postComment(req.body)
        .then(comment => res.send(new Response(true, comment)))
        .catch(error => res.status(500).send(new Response(false, error)));
});

/**
 * get all comments
 * **/
router.get('/', function (req, res, next) {
    CommentsController
        .getComments()
        .then(comments => res.send(new Response(true, comments)))
        .catch(error => res.status(500).send(new Response(false, error)));
});


module.exports = router;
