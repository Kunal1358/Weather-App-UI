const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Ddefine path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebars and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//setup static directory to server
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather-App | Home',
        name: 'Kunal'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather-App | Help',
        helpText: 'Some useful text',
        name: 'Kunal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather-App | About Me',
        name: 'Kunal'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return res.send({ error })
            }

            res.send({
                address: req.query.address,
                location: forecastData,
                rain: 'nill'
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kunal',
        errorMessage: "Help article not found"
    })
})

// * is a wild card character
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kunal',
        errorMessage: "Page not found"
    })
})

app.listen(3000, () => {
    console.log('Server is up and running on port 3000');
})