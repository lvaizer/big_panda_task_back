const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String,
    avatar: String,
    last_active: String,
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

const model = mongoose.model('User', UserSchema, 'users');

module.exports = model;
