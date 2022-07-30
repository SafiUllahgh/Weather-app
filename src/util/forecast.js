//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require("request")

const forecast = (latitude,longitude,callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=5961de88025254308f65ce042ae95d35&query="+ latitude + ',' + longitude
    request({url:url, json:true},(error,{ body })=>{
        
        if (error){
            callback("Unable to connect to servers")
        }
        else if(body.error){
            callback("Unable to find location")
        }
        else{
            callback(undefined,body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out.")
        }
    })
}

module.exports = forecast
