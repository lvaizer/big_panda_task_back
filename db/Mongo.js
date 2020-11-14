const mongoose = require('mongoose');
const Config = require('../config');

connect();

function connect() {
    mongoose.connect(Config.URLS.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
}
