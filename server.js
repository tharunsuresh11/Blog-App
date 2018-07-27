const express = require('express');
const request = require('request');
const  bodyParser = require('body-parser');
let app = express()
let apikey = '3b48a71b245e50d45f01aea5144f1554';


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.get('/',function(req,res){
  res.render('index', {weather: null, error: null});
})

app.post('/', function(req, res){
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;

  request(url, function(err, response, body) {
    if (err) {
      res.render('index', {weather: null, error: 'please enter city'})
    }else {
      let weather = JSON.parse(body)
      if (weather.main == undefined) {
        res.render('index', {weather: null, error: "Error please try again"})
      }else {
        let weatherText = `its ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index' , {weather: weatherText, error: null});
      }
    }
  })
})

app.listen(3000, function(err){
  if (err) {
    console.log(err)
  }else {
    console.log("app listening on port 3000")
  }
})
