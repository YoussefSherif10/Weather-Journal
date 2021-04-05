// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, listening);

function listening() {
    console.log("server running");
    console.log(`running on localhost: ${port}`);
}

//setup the respond of a get function
app.get('/data', function(req, res) {
    res.send(projectData);
});

//setup the POST function to store data in projectData object
app.post('/weather', callback);

function callback(req, res) {
    data = req.body;
    projectData['temperature'] = data.temperature;
    projectData['date'] = data.date;
    projectData['user response'] = data.user;
    console.log(projectData);
}