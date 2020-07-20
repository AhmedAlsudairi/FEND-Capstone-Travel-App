// Setup empty JS object to act as endpoint for all routes
let projectData = {};

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
app.use(express.static('website'));


// Setup Server
const port = 3363;

const server = app.listen(port, () => { console.log(`The server is running on port number: ${port}`) });

//GET route
app.get('/add', (req, res) => {
    res.send(projectData);
});

//POST route
app.post('/add', (req, res) => {
    const newData = req.body;
    const newEntry = {
        temperature: newData.temperature,
        date: newData.date,
        userResponse: newData.userResponse
    }
    projectData = { ...newEntry };

});


