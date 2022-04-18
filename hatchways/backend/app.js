const express = require('express')
const bodyParser = require('body-parser');
const PingController = require('./controllers/ping_controller');
const PostController = require('./controllers/post_contollers');

const app = express()

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/ping', PingController.getPing);

app.get('/api/posts', PostController.getPosts);

module.exports = app;