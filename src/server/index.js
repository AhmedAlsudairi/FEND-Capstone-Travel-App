// Setup empty JS object to act as endpoint for all routes
let geoData = {};
let weatherData = {};
let pixabayData = {};
let countriesAPIData = {};
// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('dist'));


// Setup Server
const port = 8000;

const server = app.listen(port, () => { console.log(`The server is running on port number: ${port}`) });

//GET route for geonames data
app.get('/geo', (req, res) => {
    res.send(geoData);
});

//POST route
app.post('/geo', (req, res) => {
    const newData = req.body;
    const newEntry = {
        country: newData.countryName,
        latitude: newData.lat,
        longitude: newData.lng
    }
    geoData = { ...newEntry };

});

//GET route for weatherbit data
app.get('/weather', (req, res) => {
    
    res.send(weatherData);
});

//POST route for weatherbit data
app.post('/weather', (req, res) => {
    const newData = req.body;
    weatherData = { ...newData , length: 16};
});

//GET route for pixabay data
app.get('/pix', (req, res) => {
    
    res.send(pixabayData);
});

//POST route for pixabay data
app.post('/pix', (req, res) => {
    const newData = req.body;
    pixabayData = { ...newData };
});

//GET route for  REST Countries API data
app.get('/country', (req, res) => {
    
    res.send(countriesAPIData);
});

//POST route for  REST Countries API data
app.post('/country', (req, res) => {
    const newData = req.body;
    const newEntry = {
        name: newData.name,
        capital: newData.capital,
        currency: newData.currencies[0].code,
        language: newData.languages[0].name,
        population: newData.population,
        region: newData.region,
        timezone: newData.timezones[0]
    }
    console.log(newData);
    console.log(newEntry);
    countriesAPIData = { ...newEntry };
});
