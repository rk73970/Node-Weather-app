const request = require('request')
const chalk = require('chalk')

const getWeather = ({
    latitude,
    longitude,
    place: location
}, callback) => {
    // const latitude = coordinates.latitude;
    // const longitude = coordinates.longitude;
    // const location = coordinates.place;
    // console.log('latitude : ', latitude)
    // console.log('longitude : ', longitude)
    // console.log('place : ', place)
    const url = 'http://api.weatherstack.com/current?access_key=2360e718a44a75739b98a163a0f5c88f&query=' + latitude + ',' + longitude + '&units=m'

    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback(chalk.red.inverse('Unable to connect weather service !!!'), undefined)
        } else if (body.error) {
            callback(chalk.red.inverse('Unable to retrieve weather for given location!!!'), undefined)
        } else {
            callback(undefined, {
                location,
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }
    })

}

module.exports = getWeather;