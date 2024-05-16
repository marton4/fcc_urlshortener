require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();



//body parser 
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Basic Configuration 
const port = 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// my code 

let originalUrls = [];
let shortUrls = [];

app.post('/api/shorturl', (req, res) => {
  const url = req.body.url;

  if(!url.includes(`https://`) && !url.includes(`http://`)) {
    return res.json({ error: 'invalid url' })
  };

  if (!originalUrls.includes(url)) {
    originalUrls.push(url);
    shortUrls.push(shortUrls.length);

    return res.json({
      original_url: url,
      short_url: shortUrls.length - 1
    })
  };

  return res.json({
    original_url: url,
    short_url: shortUrls[originalUrls.indexOf(url)]
  });
});

app.get('/api/shorturl/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl;

  if (shortUrl >= shortUrls.length) {
    return res.json({ error: 'invalid url' })
  };

  return res.redirect(originalUrls[shortUrl]);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
