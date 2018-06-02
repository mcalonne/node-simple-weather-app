const yargs = require('yargs');
const geolocService = require('./services/geoloc.service');
const weatherService = require('./services/weather.service');

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
    let addressProvided = argv.address;
    geolocService.geocodeAddress(encodeURIComponent(addressProvided)).then(response => {
        console.log(`Retrieving weather for address : ${response.address}`);
        weatherService.fetchWeather(response.latitude, response.longitude, (errorMessage, weatherData) => {
            if(errorMessage){
                console.error(errorMessage); 
            } else {
                console.log(`Current temperature is ${weatherData.temperature}F. It feels like ${weatherData.apparentTemperature}F.`);
            }
        });
    }).catch(error => {
        console.error(error);
    });
};

main();
