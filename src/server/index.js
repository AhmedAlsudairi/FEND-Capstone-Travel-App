// Setup empty JS object to act as endpoint for all routes
let geoData = {};
let wheatherData = {};
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
        country: newData.country,
        longitude: newData.longitude,
        latitude: newData.latitude
    }
    geoData = { ...newEntry };

});

//GET route for wheatherbit data
app.get('/wheather', (req, res) => {
    
    res.send(wheatherData);
});

//POST route for wheatherbit data
app.post('/wheather', (req, res) => {
    const newData = req.body;
    wheatherData = { ...newData };
});


