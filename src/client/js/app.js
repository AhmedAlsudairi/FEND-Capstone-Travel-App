
/* Global Variables */
// base URL for geonames API
const geonamesURL = 'http://api.geonames.org/searchJSON?q=';
const geonamesKey = '&username=a7mad1199';

const weatherbitURL = 'https://api.weatherbit.io/v2.0/forecast/daily';
const weatherbitKey = '&key=62c2c4c4249a47cb9b82e42911703c22';

const pixabayURL = 'https://pixabay.com/api/?&image_type=photo&q=';
const pixabayKey = '&key=17634723-f4b33149baa42378817312beb';
// GET request to geonames
export const getFromAPI = async (url) => { //

    const request = await fetch(url);

    try {
        const newData = await request.json();
        return newData;
    } catch (error) {
        console.log(error);
    }
}


// POST data to server side (server.js) 
export const postData = async (url = '', data = {}) => { // 
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

// update user interface acording to data stored in server side (server.js)
export const getData = async (url) => { // 

    const request = await fetch(url);

    try {
        const newData = await request.json();
       return newData;
    } catch (error) {
        console.log(error);

    }
}

// get city from the user, then send GET request to geonames, then POST the data to server side (server.js), and then update the user interface
export const generateListener = () => { //
    const city = document.getElementById('city').value;
    const geoURL = geonamesURL + city + geonamesKey;

    getFromAPI(geoURL)
        .then((data) => {
            const response = data.geonames[0];
            const country = response.countryName;
            const latitude = response.lat;
            const longitude = response.lng;

            const geonamesData = {
                country: country,
                latitude: latitude,
                longitude: longitude
            }
            postData('http://localhost:8000/geo', geonamesData);
        }).then((data) => {
            const countdown = getCountdown();
            let goeData;
            (async () => {
                 goeData = await getData('http://localhost:8000/geo');
                 getFromWeatherbit(goeData)
                 .then((whethData)=>{
                     const weatherbitData = whethData.data;
                     postData('http://localhost:8000/weather',weatherbitData);
                     updateUI();
                 });
              })();
        })
        .then(()=>{
            let cityWithoutSpace = city.split(' ');
            cityWithoutSpace= cityWithoutSpace.join('+');
            console.log(cityWithoutSpace);
            
            const url = pixabayURL+cityWithoutSpace+pixabayKey;
            console.log(url);
            getFromAPI(url)
            .then((data)=>{
                console.log(data);
                document.getElementById('content').innerHTML = `<img src=${data.hits[0].webformatURL} alt=${city} style="width: 500px; height: 350px;">`;
            })
            .catch((error)=>{
                console.log(error);
                document.getElementById('content').innerHTML = 'no appropriate image is found';
            })
        });
}

export const getFromWeatherbit = async (geoData) => { //
     const lat = geoData.latitude;
     const lng = geoData.longitude;

     const request = await fetch(weatherbitURL+`?&lat=${lat}&lon=${lng}`+weatherbitKey);
     try{
         const newData = await request.json();
         return newData;
     }catch(error){
         console.log(error);
     }
}

export const getCountdown = () => { //
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    today = yyyy+'-'+mm+'-'+dd;

    const userDate = document.getElementById('date').value;

    const tripStart = Date.parse(today);
    const tripEnd = Date.parse(userDate);
  
    const countdown = tripEnd - tripStart;
  
    const daysLeft = Math.ceil(countdown / 86400000);
    console.log(daysLeft);
    return daysLeft;
}

export const updateUI = async () => {
    getData('http://localhost:8000/weather')
    .then((data)=>{
        const userDate = document.getElementById('date').value;
//compare between dates (transfer them to miliseconds)
        let a = new Date(userDate).getTime();
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            let b= new Date(data[i].datetime).getTime();
            if (b >= a) {
                console.log(data[i]);
                document.getElementById('temp').innerHTML='temp: '+data[i].temp;
              break;
            }
          }
    })
}


