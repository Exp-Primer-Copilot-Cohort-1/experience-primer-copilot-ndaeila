// Create web server
// 1. Create a new express app
// 2. Create a route handler for GET requests to /
// 3. Listen on port 4001 for incoming requests

const express = require('express');
const bodyParser = require('body-parser');
// const { randomBytes } = require('crypto');
// const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
// app.use(cors());

const commentsByPostId = {};

// app.get('/posts/:id/comments', (req, res) => {
//   res.send(commentsByPostId[req.params.id] || []);
// });

// app.post('/posts/:id/comments', (req, res) => {
//   const commentId = randomBytes(4).toString('hex');
//   const { content } = req.body;

//   const comments = commentsByPostId[req.params.id] || [];

//   comments.push({ id: commentId, content });

//   commentsByPostId[req.params.id] = comments;

//   res.status(201).send(comments);
// });

// app.listen(4001, () => {
//   console.log('Listening on 4001');
// });

app.get('/posts/:id/comments', async (req, res) => {
  // res.send(commentsByPostId[req.params.id] || []);
  const { data } = await axios.get(
    `http://localhost:4001/posts/${req.params.id}/comments`
  );

  res.send(data);
});

app.post('/posts/:id/comments', async (req, res) => {
  // const commentId = randomBytes(4).toString('hex');
  // const { content } = req.body;

  // const comments = commentsByPostId[req.params.id] || [];

  // comments.push({ id: commentId, content });

  // commentsByPostId[req.params.id] = comments;

  // res.status(201).send(comments);

  const { content } = req.body;

  const { data } = await axios.post(
    `http://localhost:4001/posts/${req.params.id}/comments`,
    { content }
  );

  res.send(data);
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});