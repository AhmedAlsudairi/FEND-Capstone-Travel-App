/* Global Variables */
// base URL for openWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
// API personal key for openWeatherMap
const apiKey = '&appid=0ebcaa3a3d5701a1006c148ae6505f48';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// GET request to openWeatherMap
const getData = async (url) => {

    const request = await fetch(url);

    try {
        const newData = await request.json();
        return newData;
    } catch (error) {
        console.log(error);
    }
}

// POST wheather data to server side (server.js) 
const postData = async (url = '', data = {}) => {

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
const updateUI = async () => {

    const request = await fetch('/add');

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
const generateListener = () => {
    const zipCode = document.getElementById('zip').value;
    const url = baseURL + zipCode + apiKey;

    getData(url)
        .then((data) => {
            const temperature = data.main.temp;
            const userResponse = document.getElementById('feelings').value;

            const wheatherData = {
                temperature: temperature,
                date: newDate,
                userResponse: userResponse
            }
            postData('/add', wheatherData);
        }).then(() => {
            updateUI();
        });
}

//click listener to execute getData function
const generate = document.getElementById('generate');
generate.addEventListener('click', generateListener);

