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
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

// my code 

let originalUrls = [];
let shortUrls = [];

app.post('/api/shorturl', (req, res) => {
  const url = req.body.url;
  
  if (!originalUrls.includes(url)) {
    originalUrls.push(url);
    shortUrls.push(shortUrls.length);

    return res.json({
      original_url: url,
      short_url: shortUrls.length - 1
    })

  return res.json({
    
  })
  };
  
  res.json({original_url: originalUrls[0]},{short_url: shortUrls[0]});

  });




