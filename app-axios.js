const yargs = require('yargs')
const axios = require('axios')

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

var encodedAddress = encodeURIComponent(argv.address)
console.log('encodedAddress: ', encodedAddress)
var geocodeURL = `http://www.mapquestapi.com/geocoding/v1/address?key=5xqNcMuPImfWgmtpPNRcTEpchJcQRxMK&location=${encodedAddress}`

axios.get(geocodeURL).then((response) => {
    // console.log(JSON.stringify(response.data,undefined,3))
    if (response.data===undefined || response.data==="") {
        throw new Error('Unable to connect to Address server. Please try again later')
    }
        var location = response.data.results[0].providedLocation.location
        var lat = response.data.results[0].locations[0].displayLatLng.lat
        var lng = response.data.results[0].locations[0].displayLatLng.lng
        var weatherURL = `https://api.darksky.net/forecast/be443679bb6209aaa459d83ff7ef23a3/${lat},${lng}`
        console.log(`Location: ${location}, Lat: ${lat}, Lng: ${lng}`)
    return axios.get(weatherURL)

}).then((response) => {
    var temperature = response.data.currently.temperature
    var apparentTemp = response.data.currently.apparentTemperature
    var summary = response.data.currently.summary
    console.log(`currentTemp: ${temperature}, apparentTemp: ${apparentTemp}, summary: ${summary}` )
}).catch((e) => {
    if (e.code) {
        console.log('Unable to connect to Address server. Please try again later')
    } else {
        console.log(e.message)
    }
})



