const yargs = require('yargs');
const axios = require('axios');
const endpoints = require('./endpoints');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch the weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

let main = () => {
    let addressProvided = encodeURIComponent(argv.address);
    axios.get(endpoints.getGeocodeUri(addressProvided)).then(resp => {
        if(resp.data.status === 'ZERO_RESULTS'){
            throw new Error('Unable to find that address.');
        }
        var data = resp.data.results[0];
        var addr = data.formatted_address;
        var lat = data.geometry.location.lat;
        var lng = data.geometry.location.lng;
        console.log(`Retrieve weather for address : ${addr}`);
        return axios.get(endpoints.getWheatherForecastUri(lat, lng));
    })
    .then(resp => {
        var temperature = resp.data.currently.temperature;
        var apparentTemperature = resp.data.currently.apparentTemperature;
        console.log(`Current temperature is ${temperature}F. It feels like ${apparentTemperature}F.`);
    })
    .catch(err => {
        if(err.code === 'ENOTFOUND'){
            console.log('Unable to connect to API servers.');
        }
        else{
            console.log(err.message);
        }
    });
};

main();
