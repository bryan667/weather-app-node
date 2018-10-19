const request = require('request')

var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address)
    console.log('Encoded:', encodedAddress)

    request({
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=5xqNcMuPImfWgmtpPNRcTEpchJcQRxMK&location=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
            if (error || body===undefined) {
                callback('Unable to connect to Address server. Please try again later',undefined)
        }   else if (body.info.statuscode===0) {
            callback(undefined, {
                Location: body.results[0].providedLocation.location,
                Latitude: body.results[0].locations[0].displayLatLng.lat,
                Longitude: body.results[0].locations[0].displayLatLng.lng
            })
        }   else {
            callback('Unable to connect to Address server. Please try again later',undefined)
        }
    })
}

module.exports = {
    geocodeAddress: geocodeAddress,
}
