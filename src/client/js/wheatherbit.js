
/* Global Variables */
// base URL for openWeatherMap API
const baseURL = 'http://api.weatherbit.io/v2.0/';
// API personal key for openWeatherMap
const apiKey = '&62c2c4c4249a47cb9b82e42911703c22';

// GET request to openWeatherMap
export const getData = async (url) => {

    const request = await fetch(url);

    try {
        const newData = await request.json();
        return newData;
    } catch (error) {
        console.log(error);
    }
}

// POST wheather data to server side (server.js) 
export const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        return newData;

    } catch (error) {
        console.log(error);
    }
}

// update user interface acording to weather data stored in server side (server.js)
export const updateUI = async () => {

    const request = await fetch('http://localhost:8000/wheather');

    try {
        const newData = await request.json();
        const date = document.getElementById('country');
        const temp = document.getElementById('temp');
        const content = document.getElementById('content');
        
        date.innerHTML = 'country: ' + newData.country;
        temp.innerHTML = 'longitude: ' + newData.longitude;
        content.innerHTML = 'latitude: ' + newData.latitude;
    } catch (error) {
        console.log(error);

    }
}

// get zipcode and feeling from the user, then send GET request to openWeatherMap, then POST the data to server side (server.js), and then update the user interface
export const generateListener = () => {
    const city = document.getElementById('city').value;
    const url = baseURL + city + apiKey;

    getData(url)
        .then((data) => {
            const response = data.geonames[0];
            const country = response.countryName;
            const longitude = response.lng;
            const latitude = response.lat;
            

            const geonamesData = {
                country: country,
                longitude: longitude,
                latitude: latitude
            }
            postData('http://localhost:8000/wheather', geonamesData);
        }).then(() => {
            updateUI();
        });
}

export const countdown = () => {
    const date = document.getElementById('date').value;
}