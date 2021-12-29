const request = require('request');

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=hourly,daily,minutely&appid=91d19f567eea59f356ec6e95febdccb7&units=metric'

    request({ url, json: true }, (error, {body}) => {

        if (error) {
            callback('Unaable to connect to wheater service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'It is currently ' + body.current.temp + ' degress out. Wind is flowing at the speed of  ' + body.current.wind_speed + ' meter/sec. Humidity is ' + body.current.humidity + '%.')
        }
    })
}

module.exports = forecast
