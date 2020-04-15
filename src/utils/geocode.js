const request = require('request')
const chalk = require('chalk')

const geoCode = (location, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1Ijoicms3Mzk3MCIsImEiOiJjazh2aDllMTMwMGJhM29xcHl5Mmw3cnpqIn0.lIEFbXybx-mGAGIU0NsgEg&limit=1'
    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback(chalk.red.inverse('Unable to connect mapbox service !!!'), undefined)
        } else if (body.features.length === 0) {
            callback(chalk.red.inverse('Unable to retrieve geo location for given search string!!!'), undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                place: body.features[0].place_name
            })
        }
    })

}

module.exports = geoCode;