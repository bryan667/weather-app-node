const request = require('request')

var geocodeWeather = (latitude, longitude, callback) => {
    request({
        url: `https://api.darksky.net/forecast/be443679bb6209aaa459d83ff7ef23a3/${latitude},${longitude}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemp: body.currently.apparentTemperature
            })
        } else {
            callback('Unable to fetch weather API. Please try again later',undefined)
        }
    })
}

module.exports = {
    geocodeWeather: geocodeWeather,
}