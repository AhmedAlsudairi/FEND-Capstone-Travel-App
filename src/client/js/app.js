
/* Global Variables */
// base URL for openWeatherMap API
const baseURL = 'http://api.geonames.org/searchJSON?q=';
// API personal key for openWeatherMap
const apiKey = '&username=a7mad1199';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// GET request to openWeatherMap
export const getData = async (url) => {

    const request = await fetch(url);

    try {
        const newData = await request.json();
        console.log(newData);
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

    const request = await fetch('http://localhost:8000/add');

    try {
        const newData = await request.json();
        const date = document.getElementById('date');
        const temp = document.getElementById('temp');
        const content = document.getElementById('content');

        date.innerHTML = 'Date: ' + newData.date;
        temp.innerHTML = 'Temperature: ' + newData.temperature;
        content.innerHTML = 'Feeling: ' + newData.userResponse;
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
            const temperature = data.main.temp;
            const userResponse = document.getElementById('feelings').value;

            const wheatherData = {
                temperature: temperature,
                date: newDate,
                userResponse: userResponse
            }
            postData('http://localhost:8000/add', wheatherData);
        }).then(() => {
            updateUI();
        });
}
