const request = require('request');
const endpoints = require('../endpoints');

// api call wrapped in a es6 promise
let geocodeAddress = (encodedAddress)  => {
    return new Promise((resolve, reject) => {
        request({
            url: endpoints.getGeocodeUri(encodedAddress),
            json: true
        }, (error, response, body) => {
            if(error){
                reject('Unable to connect to the google server.');
            }
            else if(body.status === 'ZERO_RESULTS'){
                reject('Address not found.');
            }
            else if(body.status === 'OK'){
                let addressData = body.results[0];
                resolve({
                    address: addressData.formatted_address,
                    latitude: addressData.geometry.location.lat,
                    longitude: addressData.geometry.location.lng
                });
            }
        });
    });
};

module.exports.geocodeAddress = geocodeAddress;