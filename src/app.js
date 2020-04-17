const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const getweather = require('./utils/getweather')

const app = express()
const port = process.env.PORT || 3000

// paths 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// custom Settings
app.use(express.static(publicDirectoryPath))
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Routers
app.get("/", (request, response) => {
    response.render('index', {
        title: 'Weather App',
        createdby: 'Rajesh kumar'
    })
})

app.get("/about", (request, response) => {
    response.render('about', {
        title: 'About',
        createdby: 'Rajesh kumar'
    })
})

app.get("/weather", (request, response) => {
    console.log('weather query string :', request.query)
    if (!request.query.location) {
        console.log('Location not provided !!!')
        return response.send({
            message: 'Location not provided !!!',
            title: 'Weather',
            createdby: 'Rajesh kumar',
        })
    }
    console.log('Getting weather details')
    geocode(request.query.location, (error, {
        latitude,
        longitude,
        place
    } = {}) => {
        if (error) {
            console.log('Error in geocode call: ', error)
            return response.send({
                message: error,
                title: 'Weather',
                createdby: 'Rajesh kumar',
            })

        }
        getweather({
            latitude,
            longitude,
            place
        }, (error, weatherdata) => {
            if (error) {
                console.log('Error in getweather call : ', error)
                return response.send({
                    message: error,
                    title: 'Weather',
                    createdby: 'Rajesh kumar',
                })
            }
            console.log('Temperature in ' + weatherdata.location + ' is ' + weatherdata.temperature + ' Celsius. Feels like ' + weatherdata.feelslike + ' Celsius.')
            response.send({
                title: 'Weather',
                createdby: 'Rajesh kumar',
                message: 'Temperature in ' + weatherdata.location + ' is ' + weatherdata.temperature + ' Celsius. Feels like ' + weatherdata.feelslike + ' Celsius.'

            })

        })
    })


})

app.get('*', (request, response) => {
    response.render('error')
})

app.listen(port, () => {
    console.log('Server is up on port :' + port)
})