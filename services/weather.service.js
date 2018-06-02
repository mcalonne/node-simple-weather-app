const request = require('request');
const endpoints = require('../endpoints');

// api call without promise
let fetchWeather = (latitude, longitude, callback) => {
    request({
        url: endpoints.getWheatherForecastUri(latitude, longitude),
        json: true
    }, (error, resp, body) => {
        if(!error && resp.statusCode === 200){
            callback(null, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
            callback('Unable to fetch weather.');
        }
    });
}

module.exports.fetchWeather = fetchWeather;