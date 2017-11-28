// routes to: /posts
const fs = require('fs');

// The removal of a blog post must remove all its comments.
module.exports = {
  //gets all posts
  // curl "http://localhost:3000/posts"
  getPosts(req, res) {
    res.send(req.store.posts);
  },

  //gets one post by list index
  // curl "http://localhost:3000/posts/1"
  getOnePost(req, res) {
    const id = req.params.postId;
    // check if post exists
    if (!req.store.posts[id]) throw new Error('Not found')
    // send back the post 
    res.send(req.store.posts[id]);
  },

  //posts post data
  // curl -H "Content-Type: application/json" -X POST -d '{"name": "Top 10 ES6 Features", "url":"http://webapplog.com/es6", "text": ""}'  "http://localhost:3000/posts" 
  addPost(req, res) {
    // save changes in memory
    req.store.posts.push(req.body);
    // persist changes to disk
    fs.writeFileSync('./data.json', JSON.stringify(req.store,null,2));  
    // send back id (index in list of posts) 
    res.send({id: req.store.posts.length - 1});
  },

  //updates post data at specific id
  // curl -H 'Content-Type: application/json' -X PUT -d '{"name": "Top 10 ES6 Features Every Developer Must Know", "url":"http://webapplog.com/es6", "text": ""}' "http://localhost:3000/posts/0"
  updatePost(req, res) {
    const id = req.params.postId;
    // check if post exists
    if (!req.store.posts[id]) throw new Error('Not found')
    // save changes in memory
    req.store.posts[id] = req.body;
    // persist changes to disk
    fs.writeFileSync('./data.json', JSON.stringify(req.store,null,2));  
    // send back the updated post 
    res.send(req.store.posts[id]);
  },

  //deletes post data at specific id
  // curl -X DELETE "http://localhost:3000/posts/0" 
  removePost(req, res) {
    const id = req.params.postId;
    // check if post exists
    if (!req.store.posts[id]) throw new Error('Not found')    
    // save changes in memory
    req.store.posts[id] = {
      name: `deleted`
    };
    // persist changes to disk
    fs.writeFileSync('./data.json', JSON.stringify(req.store,null,2));  
    // send back the deleted post 
    res.send(req.store.posts[id]);    
  }
}



 

