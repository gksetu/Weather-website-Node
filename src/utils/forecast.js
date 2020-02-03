const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/6e5e81d2f54a257f9e6576a2146735f0/" + latitude + ',' + longitude + "?lang=en&unit=us"
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + ((body.currently.temperature -32)*5/9).toFixed(2)+
                ' degree celcius out. ' + "There is a " +
                body.currently.precipProbability * 10
                + "% chance of rain." /* {
                summary: response.body.daily.data[0].summary,
                temperature: response.body.currently.temperature,
                rainProbability: response.body.currently.precipProbability*10
            } */)
        }
    })
}
/* 37.8267,-122.4233 */
module.exports = forecast