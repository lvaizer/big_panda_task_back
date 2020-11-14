const Comment = require('../models/Comment');
const User = require('../models/User');
const md5 = require('md5');

function CommentsController() {

}

/**
 * Get all the comments in the DB
 * **/
CommentsController.prototype.getComments = () => new Promise((resolve, reject) => {
    Comment.find()
        .populate('user')
        .exec((err, comments) => err ? reject(err) : resolve(comments));
});

/**
 * Post new comment
 * @param {object} data - require:
 * **/
CommentsController.prototype.postComment = (data) => new Promise((resolve, reject) => {
    getOrCreateUser(data.user)
        .then((userId) => {
            //add the userId to the data object
            data.user.user_id = userId;
            postNewComment(data)
                .then((comment) => resolve(comment))
                .catch(err => reject(err));
        })
        .catch(err => reject(err));


});

/**
 * Insert a comment into the db and return it`s id
 * **/
const postNewComment = data => new Promise((resolve, reject) => {
    //create new comment
    Comment.create(
        {
            user: data.user.user_id,
            message: data.message,
            created: data.user.last_active
        },
        (err, results) => err ? reject(err) : resolve(results._id));
});

/**
 * Check if the email exist in the DB, if true update the 'last_active' and return his id.
 * If the email not exist, create one and return his id.
 * **/
const getOrCreateUser = data => new Promise((resolve, reject) => {
    if (!data) {
        reject('No User data');
        return;
    }
    //get the user by his email
    User.find({email: data.email}, 'id', (err, results) => {
        //check if the user exist
        if (results.length === 0) {
            //create new user
            User.create(
                {
                    email: data.email,
                    last_active: data.last_active,
                    avatar: 'https://www.gravatar.com/avatar/' + md5(data.email) + '.jpg'
                },
                (err, results) => err ? reject(err) : resolve(results._id));
        } else {
            //update the existing user
            const userId = results[0]._id;
            User.update(
                {_id: userId},
                {$set: {last_active: data.last_active}},
                (err) => err ? reject(err) : resolve(userId));
        }
    });
});

module.exports = new CommentsController();
