const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

// const { routes } = require('./config.json');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/rooms/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
})

app.get('/rooms/:id/*', (req, res) => {
  const dest = req.url.split('/')[3];
  res.redirect(`http://localhost:3000/rooms/${req.params.id}/${dest}`);
});

app.post('/rooms', (req, res) => {
  res.redirect(307, 'http://localhost:3000/rooms');
})

app.post('/bookings', (req, res) => {
  res.redirect(307, 'http://localhost:3000/bookings');
})

app.put('/rooms', (req, res) => {
  res.redirect(307, 'http://localhost:3000/rooms');
})

app.put('/bookings', (req, res) => {
  res.redirect(307, 'http://localhost:3000/bookings');
})

app.delete('/rooms/:id', (req, res) => {
  res.redirect(`http://localhost:3000/rooms/${req.params.id}`);
})

app.delete('/bookings/:id', (req, res) => {
  res.redirect(`http://localhost:3000/bookings/${req.params.id}`);
})

app.listen(1000, () => {
  console.log('Social Inn proxy listening on port 1000');
});
