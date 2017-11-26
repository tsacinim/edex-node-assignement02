const fs = require('fs');
const app = require('./server')
const assert = require('assert');
const request = require('supertest');

// Testing
const test = request(app);

let defaultStore = {
  posts: [
    {name: 'Top 10 ES6 Features every Web Developer must know',
    url: 'https://webapplog.com/es6',
    text: 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.',
    comments: [
      {text: 'Cruel…..var { house, mouse} = No type optimization at all'},
      {text: 'I think you’re undervaluing the benefit of ‘let’ and ‘const’.'},
      {text: '(p1,p2)=>{ … } ,i understand this ,thank you !'}      
    ]
    }
  ]
}
fs.writeFileSync('./data.json', JSON.stringify(defaultStore,null,2));

let expectedStore = {
  "posts": [
    {
      "name": "Top 10 ES6 Features every Web Developer must know",
      "url": "https://webapplog.com/es6",
      "text": "This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.",
      "comments": [
        {
          "text": "Cruel…..var { house, mouse} = No type optimization at all"
        },
        {
          "text": "I think you’re undervaluing the benefit of ‘let’ and ‘const’."
        },
        {
          "text": "(p1,p2)=>{ … } ,i understand this ,thank you !"
        }
      ]
    },
    {
      "name": "Top 10 ES6 Features",
      "url": "http://webapplog.com/es6",
      "text": "example POST post",
      "comments": [
        {
          "text": "example POST comment"
        },
        {
          "text": "comment updated by PUT request "
        },
        {
          "text": "deleted"
        }
      ]
    },
    {
      "name": "Top 10 ES6 Features",
      "url": "http://webapplog.com/es6",
      "text": "updated by PUT request"
    },
    {
      "name": "deleted"
    }
  ]
}

//example test for: curl "http://localhost:3000/posts"
test.get('/posts') 
  .expect('Content-Type', /json/)
  .expect(200) 
  .end(function(err, res) {
    if (err) throw err;
    console.log('Testing OK: got a 200 response code from route: GET /posts')
  });

//example test for: curl "http://localhost:3000/posts/0"  
test.get('/posts/0') 
  .expect('Content-Type', /json/)
  .expect(200) // .expect(200, require('./store').posts[0])
  .end(function(err, res) {
    if (err) throw err;
    console.log('Testing OK: got a 200 response code from route: GET /posts/0')
  });

test.post('/posts')
  .send({
    "name": "Top 10 ES6 Features", 
    "url":"http://webapplog.com/es6", 
    "text": "example POST post"
  })
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200) 
  .end(function(err, res) {
    if (err) throw err;
    console.log('Testing OK: got a 200 response code from route: POST /posts')
  });

//example test for: curl "http://localhost:3000/posts/0/comments"
test.get('/posts/0/comments') 
  .expect('Content-Type', /json/)
  .expect(200) 
  .end(function(err, res) {
    if (err) throw err;
    console.log('Testing OK: got a 200 response code from route: GET /posts/0/comments')
  });
  
//example test for: curl "http://localhost:3000/posts/0/comments/0"
test.get('/posts/0/comments/0') 
  .expect('Content-Type', /json/)
  .expect(200) 
  .end(function(err, res) {
    if (err) throw err;
    console.log('Testing OK: got a 200 response code from route: GET /posts/0/comments/0')
  });

test.post('/posts/1/comments')
  .send({
    "text": "example POST comment"
  })
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200) 
  .end(function(err, res) {
    if (err) throw err;
    console.log('Testing OK: got a 200 response code from route: POST /posts/1/comments')
  });

test.post('/posts/1/comments')
  .send({
    "text": "example POST comment to be updated by PUT"
  })
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200) 
  .end(function(err, res) {
    if (err) throw err;
  });

test.post('/posts/1/comments')
  .send({
    "text": "example POST comment to be removed by DELETE"
  })
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200) 
  .end(function(err, res) {
    if (err) throw err;
  });

test.put('/posts/1/comments/1')
  .send({
    "text": "comment updated by PUT request "
  })
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200) 
  .end(function(err, res) {
    if (err) throw err;
    console.log('Testing OK: got a 200 response code from route: PUT /posts/1/comments/1')
  });

test.delete('/posts/1/comments/2')
  .expect('Content-Type', /json/)
  .expect(200) // 
  .end(function(err, res) {
    if (err) throw err;
    console.log('Testing OK: got a 200 response code from route: DELETE /posts/1/comment/2')
  });

test.post('/posts')
  .send({
    "name": "Top 10 ES6 Features", 
    "url":"http://webapplog.com/es6", 
    "text": "example POST to be updated by PUT"
  })
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200) 
  .end(function(err, res) {
    if (err) throw err;
  });

test.post('/posts')
  .send({
    "name": "Top 10 ES6 Features", 
    "url":"http://webapplog.com/es6", 
    "text": "example POST to be removed by DELETE"
  })
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200) 
  .end(function(err, res) {
    if (err) throw err;
  });

test.put('/posts/2')
  .send({
    "name": "Top 10 ES6 Features", 
    "url":"http://webapplog.com/es6", 
    "text": "updated by PUT request"
  })
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200) 
  .end(function(err, res) {
    if (err) throw err;
    console.log('Testing OK: got a 200 response code from route: PUT /posts/2')
  });

test.delete('/posts/3')
  .expect('Content-Type', /json/)
  .expect(200) // 
  .end(function(err, res) {
    if (err) throw err;
    console.log('Testing OK: got a 200 response code from route: DELETE /posts/3')
    
    let actualStore = require('./store');
    
    // console.log(JSON.stringify(expectedStore))
    // console.log(JSON.stringify(actualStore))
    
    assert(JSON.stringify(expectedStore) === JSON.stringify(actualStore))

    console.log('All Tests OK')
    
    // reset the test data store to default value
    fs.writeFileSync('./data.json', JSON.stringify(defaultStore,null,2));
    process.exit(0)
  });
