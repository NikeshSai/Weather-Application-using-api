const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended : true})); /* used for using html inputs*/
app.get("/", function(req, res)
{
res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){


    const query = req.body.cityName;
    const apiKey ="99443585d504ba156b218ca3101c4ff0";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query+"&units="+ unit + "&appid="+ apiKey;
    https.get(url, function(response) {    /* getting data from external server*/
      console.log(response.statusCode)

      response.on("data", function(data) {  /* after/on getting data, we are parsing the data to JSON format */
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png" ;    /* fetched from original website docs */
      res.write("<p>The weather is currently " + weatherDescription +"</p>");
      res.write("<h1>The temperature in "+ query +" is " + temp + " degree Celcius.</h1>");
      res.write("<img src = "+ imageURL + ">");
      res.send()  /* we are now actually,sending the whole server data(internal & external) to client which is google */

})


})

})








app.listen(3000, function(){

console.log("Server started!!");
})
