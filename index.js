var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

//to access public files
app.use(express.static('public'));

// Base Route
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:dateInput", function (req, res) {
  const {dateInput} = req.params;
  let date

  if(dateInput > 10){
     if(dateInput.includes(" ")){
      date = new Date.parse(dateInput)
     }else{
      date = parseInt(dateInput)
     }
  }
  else{
    date = dateInput
  }

  const finalDate = new Date(date);

  const timestamp ={
    unix : finalDate.getTime(),
    utc: finalDate.toUTCString()
  }

  if(!finalDate.getTime()) return res.status(404).json({ error : "Invalid date"})

  res.status(200).json(timestamp);
});



var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
