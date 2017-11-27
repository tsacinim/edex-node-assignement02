const fs = require('fs');
let store = require('../store');

// routes to: /posts/:postId/comments
module.exports = {
  //gets comment data
  // curl "http://localhost:3000/posts/:postId/comments"
  getComments(req, res) {
    const id = req.params.postId
    // check if post exists
    if (!store.posts[id]) throw new Error('Not found')    
    // respond with the list of comments 
    res.send(store.posts[id].comments)
  }, 

  //gets one comment by list index
  // curl "http://localhost:3000/posts/0/comments/:commentId"
  getOneComment(req, res) {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    // check if post & comment exist
    if (!store.posts[postId].comments[commentId]) throw new Error('Not found')    
    // send back the updated post 
    res.send(store.posts[postId].comments[commentId]);
  },

  //posts comment data
  // curl -H "Content-Type: application/json" -X POST -d '{"text": "boom!"}'  "http://localhost:3000/posts/:postId/comments"   
  addComment(req, res) {
    const id = req.params.postId;
    // check if post exists
    if (!store.posts[id]) throw new Error('Not found')
    // if no comments add a comments list
    if(!store.posts[id].comments) {
      store.posts[id].comments = [];
    }
    // save changes in memory
    store.posts[id].comments.push(req.body);
    // persist changes to disk
    fs.writeFileSync('./data.json', JSON.stringify(store,null,2));  
    // send back id (index in list of comments) 
    res.send({id: store.posts[id].comments.length - 1});
  },
  
  //updates comment data at specific id
  // curl -H 'Content-Type: application/json' -X PUT -d '{"text": "ping"}' "http://localhost:3000/posts/0/comments/3"
  updateComment(req, res) {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    // check if post & comment exist
    if (!store.posts[postId].comments[commentId]) throw new Error('Not found')    
    // save changes in memory
    store.posts[postId].comments[commentId] = req.body;
    // persist changes to disk
    fs.writeFileSync('./data.json', JSON.stringify(store,null,2));  
    // send back the updated post 
    res.send(store.posts[postId].comments[commentId]);
  },
  
  //deletes comment data at specific id
  // curl -X DELETE "http://localhost:3000/posts/0/comments/3" 
  removeComment(req, res) {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    // check if post & comment exist
    if (!store.posts[postId].comments[commentId]) throw new Error('Not found')    
    // save changes in memory
    store.posts[postId].comments[commentId] = {
      // text: `deleted at ${new Date().getDate()}`
      text: `deleted`
    }
    // persist changes to disk
    fs.writeFileSync('./data.json', JSON.stringify(store,null,2));  
    // send back the deleted post 
    res.send(store.posts[postId].comments[commentId]); 
  }  
}