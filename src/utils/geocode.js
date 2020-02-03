let request = require('request')
let geocode = (address, callback) => {
    let url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoiZ2F1cm" +
        "F2LWt1bWFyLXNldHUiLCJhIjoiY2s1dGx2ZW1sMHg4dzNucGI1ZnJqN2Z2NCJ9.SncH6y7SFlXN5dLMrDMf8g"
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode