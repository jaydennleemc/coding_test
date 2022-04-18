
const express = require('express')
const bodyParser = require('body-parser');
const PingController = require('./controllers/ping_controller');
const PostController = require('./controllers/post_contollers');


const app = express()
const port = 3000

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/ping', PingController.getPing);

app.get('/api/posts', PostController.getPosts);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})