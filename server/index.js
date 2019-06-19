const newrelic = require('newrelic');
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const request = require('request');
const compression = require('compression');

const app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/rooms/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/api/rooms/**', (req, res) => {
  request
    .get(`http://54.173.12.95${req.originalUrl}`, (err, response, body) => {
      if (err || !response) {
        res.sendStatus(404);
      } else {
        res.status(200).send(body);
      }
    })
});

app.post('/api/bookings', (req, res) => {
  request
    .post({
      url: `http://54.173.12.95:3000${req.originalUrl}`,
      method: 'POST',
      json: req.body,
    }, (err, response, body) => {
      if (err || !response) {
        res.sendStatus(500);
      } else if (response) {
        if (response.statusCode === 201) {
          res.status(201).send(body);
        } else {
          res.sendStatus(202);
        }
      }
    })
});

app.listen(2000, () => {
  console.log('Social Inn proxy listening on port 2000');
});
