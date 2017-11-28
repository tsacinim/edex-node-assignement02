const fs = require('fs');

// routes to: /posts/:postId/comments
module.exports = {
  //gets comment data
  // curl "http://localhost:3000/posts/:postId/comments"
  getComments(req, res) {
    const id = req.params.postId
    // check if post exists
    if (!req.store.posts[id]) throw new Error('Not found')    
    // respond with the list of comments 
    res.send(req.store.posts[id].comments)
  }, 

  //gets one comment by list index
  // curl "http://localhost:3000/posts/0/comments/:commentId"
  getOneComment(req, res) {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    // check if post & comment exist
    if (!req.store.posts[postId].comments[commentId]) throw new Error('Not found')    
    // send back the requested comment 
    res.send(req.store.posts[postId].comments[commentId]);
  },

  //posts comment data
  // curl -H "Content-Type: application/json" -X POST -d '{"text": "boom!"}'  "http://localhost:3000/posts/:postId/comments"   
  addComment(req, res) {
    const id = req.params.postId;
    // check if post exists
    if (!req.store.posts[id]) throw new Error('Not found')
    // if no comments add a comments list
    if(!req.store.posts[id].comments) {
      req.store.posts[id].comments = [];
    }
    // save changes in memory
    req.store.posts[id].comments.push(req.body);
    // persist changes to disk
    fs.writeFileSync('./data.json', JSON.stringify(req.store,null,2));  
    // send back id (index in list of comments) 
    res.send({id: req.store.posts[id].comments.length - 1});
  },
  
  //updates comment data at specific id
  // curl -H 'Content-Type: application/json' -X PUT -d '{"text": "ping"}' "http://localhost:3000/posts/0/comments/3"
  updateComment(req, res) {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    // check if post & comment exist
    if (!req.store.posts[postId].comments[commentId]) throw new Error('Not found')    
    // save changes in memory
    req.store.posts[postId].comments[commentId] = req.body;
    // persist changes to disk
    fs.writeFileSync('./data.json', JSON.stringify(req.store,null,2));  
    // send back the updated post 
    res.send(req.store.posts[postId].comments[commentId]);
  },
  
  //deletes comment data at specific id
  // curl -X DELETE "http://localhost:3000/posts/0/comments/3" 
  removeComment(req, res) {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    // check if post & comment exist
    if (!req.store.posts[postId].comments[commentId]) throw new Error('Not found')    
    // save changes in memory
    req.store.posts[postId].comments[commentId] = {
      // text: `deleted at ${new Date().getDate()}`
      text: `deleted`
    }
    // persist changes to disk
    fs.writeFileSync('./data.json', JSON.stringify(req.store,null,2));  
    // send back the deleted post 
    res.send(req.store.posts[postId].comments[commentId]); 
  }  
}