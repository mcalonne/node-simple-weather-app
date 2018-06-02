const GOOGLE_KEY_PARAM = 'YOUR_KEY';
const FORECAST_KEY_API = 'YOUR_KEY';

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