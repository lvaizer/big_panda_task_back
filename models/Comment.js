const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    message: String,
    created: String
});

const model = mongoose.model('Comment', CommentSchema, 'comments');

module.exports = model;
