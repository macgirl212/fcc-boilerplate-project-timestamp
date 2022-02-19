// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// empty date param endpoint
app.get("/api/", (req, res) => {
  const unix = Date.now()
  const utcString = new Date(unix).toUTCString()
  return res.status(200).json({unix: unix, utc: utcString})
})


// your first API endpoint... 
app.get("/api/:date", (req, res) => {
  // if param is unix number
  if (Math.floor(req.params.date) > 0) {
    const unix = Math.floor(req.params.date)
    const utcString = new Date(unix).toUTCString()
    return res.status(200).json({unix: unix, utc: utcString});
  }
  // if param is not a date
  if (isNaN(Date.parse(req.params.date))) {
    return res.status(400).json({error: "Invalid date"})
  }
  // if param is a date
  const query = new Date(req.params.date)
  if (query instanceof Date && !NaN) {
    const unix = Math.floor(query.getTime())
    const utcString = query.toUTCString()
    return res.status(200).json({unix: unix, utc: utcString});
  }
  // any other errors
  return res.status(400).json({error: "Invalid date"})
});

const port = process.env.PORT || 3000


// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
