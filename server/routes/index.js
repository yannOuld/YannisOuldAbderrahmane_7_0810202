const express = require('express');
const app = express();

app.use('/user', require('./user.js'));
app.use('/post', require('./post.js'));
app.use('/post', require('./comment.js'));
app.use('/post', require('./like.js'));

module.exports = app;