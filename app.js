/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = 'e098e8ef7d1eac60c0802edaa4d53264';
let appid = '&appid=';
let units = '&units=metric';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

//getting data from the endpoint 
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const zipcode = document.getElementById('zip').value;
    const user_response = document.getElementById('feelings').value;
    if (zipcode === '') {
        alert('please enter a ZIP code');
    } else {
        getWeather(baseURL, zipcode, appid, apiKey, units)
            .then(function(data) {
                //posting the data to the endpoint on the server
                postData('/weather', { temperature: data.main.temp, date: newDate, user: user_response });
            })
            .then(function() {
                updateUI();
            });
    }
};

//function to get the weather from the openWeather API
const getWeather = async(baseURL, zipcode, appid, key, units) => {

    const res = await fetch(baseURL + zipcode + appid + key + units);
    try {

        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

//function that post the data to the endpoint on the server
const postData = async(url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });

    try {
        return;
    } catch (error) {
        console.log("error", error);
    }
}

//function to update the UI
const updateUI = async() => {
    const request = await fetch('/data');
    try {
        const data = await request.json();
        document.getElementById('date').innerHTML = data.date;
        document.getElementById('temp').innerHTML = data.temperature;
        document.getElementById('content').innerHTML = data['user response'];
    } catch (error) {
        console.log('error', error);
    }
}

//94040,us
