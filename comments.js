// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  fs.readFile('./comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('An error occurred');
    } else {
      res.send(data);
    }
  });
});

app.post('/comments', (req, res) => {
  fs.readFile('./comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('An error occurred');
    } else {
      const comments = JSON.parse(data);
      comments.push(req.body);
      fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
        if (err) {
          res.status(500).send('An error occurred');
        } else {
          res.send('Comment added');
        }
      });
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Run the server
// Open a terminal and run the following command:
// node comments.js
// Open a browser and enter the following URL:
// http://localhost:3000/comments
// You should see the following output:
// []
// Open a new terminal and run the following command:
// curl -X POST -H "Content-Type: application/json" -d '{"author": "Me", "message": "Hello"}' http://localhost:3000/comments
// Open a browser and enter the following URL:
// http://localhost:3000/comments
// You should see the following output:
// [{"author":"Me","message":"Hello"}]
// Open a new terminal and run the following command:
// curl -X POST -H "Content-Type: application/json" -d '{"author": "You", "message": "Hi"}' http://localhost:3000/comments
// Open a browser and enter the following URL:
// http://localhost:3000/comments
// You should see the following output:
// [{"author":"Me","message":"Hello"},{"author":"You","message":"Hi"}]
// Open a new terminal and run the following command:
// curl -X POST -H "Content-Type: application/json" -d '{"author": "Them