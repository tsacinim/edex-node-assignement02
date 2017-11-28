// Imports
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const {posts, comments} = require('./routes');

// Instantiations
const app = express(); 
let store = require('./store');

// Configurations
if (process.env.NODE_ENV === 'testing') {
  app.set('port', process.env.PORT || 3001);
} else {
  app.set('port', process.env.PORT || 3000);
}

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());

// custom middleware to add the store to the request object
const middlewareAddStore = (request, response, next) => {
  // add store to request
  request.store = store;
  console.log('store added to request');
  // Execute the callback when done
  next();
}
app.use(middlewareAddStore);

// Routes
// GET / index/home route
app.get('/', (req, res)=>{
  res.send('Hello world! \n try a route, for example: \n /posts');
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
app.get('*', function(req, res){ // all other routes
  res.status(404).send('Not found');
});
app.use(function (err, req, res, next) { // catch all thrown errors
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// Bootup
app.listen(app.get('port'), 
  () => console.log(`server listening at port: ${app.get('port')}`));

// Module exports 
module.exports = app; 