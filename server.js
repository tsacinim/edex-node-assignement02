// Imports
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const {posts, comments} = require('./routes');
const request = require('supertest');


// Instantiations
const app = express(); 

// Configurations
app.set('port', process.env.PORT || 3000);

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());

// example custom middleware 
const middleware = (request, response, next) => {
  // Modify request or response
  // Execute the callback when done
  console.log('custom middleware applyed')
  next()
}
app.use(middleware)

// Routes
// GET / index/home route
app.get('/', (req, res)=>{
  res.send('hello world');
});

// GET and POST /posts
app.get('/posts', posts.getPosts)
app.post('/posts', posts.addPost)
app.get('/posts/:postId', posts.getOnePost)
// PUT and DELETE /posts/:postId/
app.put('/posts/:postId', posts.updatePost)
app.delete('/posts/:postId', posts.removePost)

// GET and POST /posts/:postId/comments
app.get('/posts/:postId/comments', comments.getComments)
app.post('/posts/:postId/comments', comments.addComment)
app.get('/posts/:postId/comments/:commentId', comments.getOneComment)
// PUT and DELETE /posts/:postId/comments/:commentId
app.put('/posts/:postId/comments/:commentId', comments.updateComment)
app.delete('/posts/:postId/comments/:commentId', comments.removeComment)

// Error handlers
// TODO

// Tests
let store = require('./store');
const test = request(app);

//example test for: curl "http://localhost:3000/posts"
test.get('/posts') 
  .expect('Content-Type', /json/)
  .expect(200, store.posts)
  .end(function(err, res) {
    if (err) throw err;
  });

// Bootup
app.listen(app.get('port'), () => console.log(`server listening at port: ${app.get('port')}`));
