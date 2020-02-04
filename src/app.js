const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast.js')
/* console.log(__dirname)
console.log(path.join(__dirname,'../public')) */
//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    //res.send('<h1>Hello Express!</h1>')
    res.render('index', {
        title: 'Weather App',
        name: 'Gaurav Setu'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Gaurav Setu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "Help Page",
        title: 'Help',
        name: 'Gaurav Setu'
    })
})

/* app.get('/help', (req, res) => {
    res.send([{
        name: 'Gaurav'
    }, {
        age: 29
    }])
})

app.get('/about', (req, res) => {
    res.send('<h1>About</h1>')
}) */

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide address'
        })
    } else {
        const locationAdr = req.query.address
        geocode(locationAdr, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({
                    error
                })
            } else {
                forecast(latitude, longitude, (error, { forecastData, dailyHigh, dailyLow }) => {
                    if (error)
                        return res.send({
                            error
                        })
                    else {
                        res.send({
                            forecast: forecastData,
                            place: locationAdr,
                            location,
                            dailyHigh,
                            dailyLow

                        })
                    }
                })
            }
        })
    }
})

app.get('/help/*', (req, res) => {
    //res.send('Help article not found')
    res.render('404', {
        title: '404',
        name: 'Gaurav Setu',
        errorMessage: 'Help article not found'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    //res.send('My 404 page')
    res.render('404', {
        title: '404',
        name: 'Gaurav Setu',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})