/* Global Variables */

// base URL and key for geonames API
const geonamesURL = 'http://api.geonames.org/searchJSON?q=';
const geonamesKey = '&username=a7mad1199';

// base URL and key for weatherbit API
const weatherbitURL = 'https://api.weatherbit.io/v2.0/forecast/daily';
const weatherbitKey = '&key=62c2c4c4249a47cb9b82e42911703c22';

// base URL and key for pixabay API
const pixabayURL = 'https://pixabay.com/api/?&image_type=photo&q=';
const pixabayKey = '&key=17634723-f4b33149baa42378817312beb';

// base URL and key for REST Countries API
const countriesAPI = 'https://restcountries.eu/rest/v2/name/'

// hold the value of the input element that entered by the user
let destination;
let spinner = document.getElementById('spinner');

/* Asynchronous Functions */

// POST data to express server (index.js) 
export const postData = async (route = '', data = {}) => {

    const response = await fetch(`http://localhost:8000${route}`, {
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

// get data from express server (index.js) 
export const getData = async (route) => { // 

    const request = await fetch(`http://localhost:8000${route}`);

    try {
        const newData = await request.json();
        return newData;

    } catch (error) {
        console.log(error);

    }
}

// get request to Geonames API
export const getFromGeonamesAPI = async (destination) => {

    const request = await fetch(geonamesURL + destination + geonamesKey);

    try {
        const newData = await request.json();
        return newData;

    } catch (error) {
        console.log(error);
    }
}

// get request to Pixabay API
export const getFromPixabayAPI = async (destination) => {

    let destinationWithoutSpace = destination.split(' ');
    destinationWithoutSpace = destinationWithoutSpace.join('+');

    const request = await fetch(pixabayURL + destinationWithoutSpace + pixabayKey);

    try {
        const newData = await request.json();
        return newData;

    } catch (error) {
        console.log(error);
    }
}

// get request to Weatherbit API
export const getFromWeatherbit = async (geoData) => {

    const lat = geoData.latitude;
    const lng = geoData.longitude;

    const request = await fetch(weatherbitURL + `?&lat=${lat}&lon=${lng}` + weatherbitKey);
    try {
        const newData = await request.json();
        return newData;
    } catch (error) {
        console.log(error);
    }
}

// get request to REST Country API
export const getFromCountryAPI = async (countData) => {

    const country = countData.country;

    const request = await fetch(countriesAPI + country);
    try {
        const newData = await request.json();
        return newData;
    } catch (error) {
        console.log(error);
    }
}

/* Main Functions */

// create trip according to the user trip data, then invoke the User Interface
export const createTrip = () => {

    const startDate = document.getElementById('startDate').value;
    const endtDate = document.getElementById('endDate').value;
    const duration = subtractDates(startDate, endtDate);
    destination = document.getElementById('destination').value;
    spinner.innerHTML = `<div class="d-flex justify-content-center">
                        <div class="spinner-border text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                        </div>
                        </div>`;

    getFromGeonamesAPI(destination)
        .then((geoData) => {
            const geonamesData = geoData.geonames[0];
            postData('/geo', geonamesData)
                .then(() => {
                    getData('/geo')
                        .then((geoData) => {
                            getFromWeatherbit(geoData)
                                .then((weathData) => {
                                    const weatherbitData = weathData.data;
                                    postData('/weather', weatherbitData)
                                        .then(() => {
                                            getData('/geo')
                                                .then((geoData) => {
                                                    getFromCountryAPI(geoData)
                                                        .then((countData) => {
                                                            const countryData = countData[0];
                                                            postData('/country', countryData)
                                                                .then(() => {
                                                                    getFromPixabayAPI(destination)
                                                                        .then((pixData) => {
                                                                            const pixabayData = pixData;
                                                                            postData('/pix', pixabayData)
                                                                                .then(() => {
                                                                                    updateUI(duration, startDate);
                                                                                });
                                                                        });
                                                                });
                                                        });
                                                });
                                        });
                                });
                        });
                });
        });
}

// remove the trip from the User Interface and from Local Storage
export const removeTrip = () => {
    document.getElementById('temp').innerHTML = '';
    document.getElementById('duration').innerHTML = '';
    document.getElementById('content').innerHTML = '';
    document.getElementById('countryInfo').innerHTML = '';
    localStorage.removeItem('temp');
    localStorage.removeItem('content');
    localStorage.removeItem('countryInfo');
    localStorage.removeItem('duration');
}

// update user interface according to the data stored in express server (index.js)
export const updateUI = (duration, startDate) => {

    spinner.innerHTML = '';
    const countdown = getCountdown(startDate);
    const dura = `<strong>Duration of your trip:</strong> ${duration} day(s)`;
    document.getElementById('duration').innerHTML = dura;
    localStorage.setItem('duration', dura);

    getData('/weather')
        .then((data) => {
            let a = new Date(startDate).getTime();
            let counter = 1;
            let temp = `
            <table class="table table-striped" style="text-align:center;">
            <thead>
              <tr>
              <th colspan="2"> Weather forcast </th> 
              </tr>
              <tr>
                <th scope="col">Day</th>
                <th scope="col">Temperature</th>
              </tr>
            </thead>
            <tbody>`;

            // find the correct date from 16 date forcast array
            for (let i = 0; i < data.length; i++) {

                let b = new Date(data[i].datetime).getTime();

                if (b >= a) {
                    temp += `<tr>
                            <th scope="row">${counter}</th>
                            <td>${data[i].temp}&#8451;</td>
                            </tr> `;
                    if (counter == 5) {
                        temp += ` </tbody>
                                </table>`  ;
                        break;
                    }
                    counter++;
                }
            }
            document.getElementById('temp').innerHTML = temp;
            localStorage.setItem('temp', temp);
        });

    getData('/country')
        .then((data) => {
            const countryInfo = `<h3>${countdown} day(s) to go!</h3>
                                <br>
                                <strong>Country information:</strong>
                                <br>
                                The counrty you want to visit is ${data.name}, and the capital city of ${data.name} is ${data.capital}. ${data.name} is located in ${data.region} region, and the population is estimated at ${data.population} people. The main language in ${data.name} is ${data.language} language, and ${data.currency} is the official currency of ${data.name}. ${data.timezone} is the time zone used in ${data.name}.`;
            document.getElementById('countryInfo').innerHTML = countryInfo;
            localStorage.setItem('countryInfo', countryInfo);
        });

    getData('/pix')
        .then((data) => {
            const content = `<img src=${data.hits[0].webformatURL} alt=${destination}>
                            <br>
                            <div id="caption">${destination}</div>`;
            document.getElementById('content').innerHTML = content;
            localStorage.setItem('content', content);
        })
        .catch((error) => {
            console.log(error);
            const content = `<div class="alert alert-danger" role="alert">No appropriate image is found!</div>`;
            document.getElementById('content').innerHTML = content;
            localStorage.setItem('content', content);
        });

}

// update User Interface according to tha data stored in Local Storage
export const getFromLocalStorage = () => {
    document.getElementById('temp').innerHTML = localStorage.getItem('temp');
    document.getElementById('duration').innerHTML = localStorage.getItem('duration');
    document.getElementById('content').innerHTML = localStorage.getItem('content');
    document.getElementById('countryInfo').innerHTML = localStorage.getItem('countryInfo');
}

// update greeting (h2 element) dynamically according to current time 
export const greeting = () => {

    const now = new Date();
    let hour = now.getHours();
    const greeting = document.getElementById("greeting");

    if (hour < 12) {
        greeting.innerHTML = "Hello,Good morning!";
    }
    if (hour >= 12) {
        hour = hour - 12;

        if (hour < 6) {
            greeting.innerHTML = "Hello,Good afternoon!";
        }

        if (hour >= 6) {
            greeting.innerHTML = "Hello,Good evening!";
        }
    }
}

/* Helper Functions */

// calculate the remaining days to go to the trip (countdown)
export const getCountdown = (startDate) => {

    let todayDate = new Date();
    const day = String(todayDate.getDate()).padStart(2, '0');
    const month = String(todayDate.getMonth() + 1).padStart(2, '0');
    const year = todayDate.getFullYear();
    todayDate = year + '-' + month + '-' + day;

    const daysLeft = subtractDates(todayDate, startDate);
    return daysLeft;
}

// calculate the difference between two dates
export const subtractDates = (dateOne, dateTwo) => {
    const d1 = Date.parse(dateOne);
    const d2 = Date.parse(dateTwo);

    const difference = d2 - d1;

    const result = Math.ceil(difference / 86400000);
    return result;
}

// event listeners
export const localStorageListener= window.addEventListener('load', getFromLocalStorage);
export const greetingListener= window.addEventListener("load", greeting, false);

const print = document.getElementById('print');
export const printListener= print.addEventListener('click', () => {
    window.print();
});

const create = document.getElementById('create');
export const createListener= create.addEventListener('click', createTrip);

const remove = document.getElementById('remove');
export const removeListener= remove.addEventListener('click', removeTrip);


