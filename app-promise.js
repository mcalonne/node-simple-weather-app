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
        let data = resp.data.results[0];
        let addr = data.formatted_address;
        let lat = data.geometry.location.lat;
        let lng = data.geometry.location.lng;
        console.debug(`Retrieve weather for address : ${addr}`);
        return axios.get(endpoints.getWheatherForecastUri(lat, lng));
    })
    .then(resp => {
        let temperature = resp.data.currently.temperature;
        let apparentTemperature = resp.data.currently.apparentTemperature;
        console.log(`Current temperature is ${temperature}F. It feels like ${apparentTemperature}F.`);
    })
    .catch(err => {
        if(err.code === 'ENOTFOUND'){
            console.error('Unable to connect to API servers.');
        } else {
            console.error(err.message);
        }
    });
};

main();
