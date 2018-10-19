const yargs = require('yargs')
const geocode = require('./API/geocode')
const weather = require('./API/weather')

const argv = yargs
    .options({
        a: {
            alias: 'address',
            demand: true,
            describe: 'Address to fetch the weather for'
        }
    })
    .help()
    .alias('help','h')
    .argv

geocode.geocodeAddress(argv.a, (error,addressResults) => {
        if (error) {
            console.log(error)
        } else {
            console.log(JSON.stringify(addressResults,undefined,3))
                weather.geocodeWeather(addressResults.Latitude, addressResults.Longitude, (error, weatherResults) => {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log(JSON.stringify(weatherResults,undefined,3))
                    }
            })
        }
})

