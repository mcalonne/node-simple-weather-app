const GOOGLE_KEY_PARAM = 'AIzaSyCIg6eqAbOwvBJUHd8yFXTGZpNRyPVeRwg';
const FORECAST_KEY_API = 'b9890f4ab020a7769ddab52aa7c6dd71';

let getGeocodeUri = (address) => {
    return `https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE_KEY_PARAM}&address=${address}`;
}

let getWheatherForecastUri = (lat, lng) => {
    return `https://api.darksky.net/forecast/${FORECAST_KEY_API}/${lat},${lng}`;
};

module.exports = {
    getGeocodeUri,
    getWheatherForecastUri
}