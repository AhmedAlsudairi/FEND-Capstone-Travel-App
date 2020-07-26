
/* Global Variables */
// base URL for geonames API
const geonamesURL = 'http://api.geonames.org/searchJSON?q=';
const geonamesKey = '&username=a7mad1199';

const weatherbitURL = 'https://api.weatherbit.io/v2.0/forecast/daily';
const weatherbitKey = '&key=62c2c4c4249a47cb9b82e42911703c22';

const pixabayURL = 'https://pixabay.com/api/?&image_type=photo&q=';
const pixabayKey = '&key=17634723-f4b33149baa42378817312beb';

const  countriesAPI = 'https://restcountries.eu/rest/v2/name/'
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
export const postData = async (route = '', data = {}) => { // 
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

// update user interface acording to data stored in server side (server.js)
export const getData = async (route) => { // 

    const request = await fetch(`http://localhost:8000${route}`);

    try {
        const newData = await request.json();
       return newData;
    } catch (error) {
        console.log(error);

    }
}

// get city from the user, then send GET request to geonames, then POST the data to server side (server.js), and then update the user interface
export const createTrip = () => { //
    const city = document.getElementById('city').value;
    const geoURL = geonamesURL + city + geonamesKey;
    const startDate = document.getElementById('date').value;
    const endtDate = document.getElementById('endDate').value;
    const duration =  subtractDates(startDate,endtDate);

    getFromAPI(geoURL)
        .then((data) => {
            console.log(data);
            const geonamesData = data.geonames[0];
            postData('/geo', geonamesData);
        }).then((data) => {
            let goeData;
            (async () => {
                 goeData = await getData('/geo');
                   
                 getFromWeatherbit(goeData)
                 .then((weathData)=>{

                     const weatherbitData = weathData.data;
                     postData('/weather',weatherbitData);
                 })
                 .then(()=>{
                     getFromCountryAPI(goeData)
                     .then((countData)=>{
                         const countryData = countData[0];
                         console.log(countryData);
                         postData('/country',countryData);
                        updateUI(duration);
                     })
                 });
              })();
        })
        .then(()=>{
            let cityWithoutSpace = city.split(' ');
            cityWithoutSpace= cityWithoutSpace.join('+');
            
            const url = pixabayURL+cityWithoutSpace+pixabayKey;
            getFromAPI(url)
            .then((pixData)=>{
                console.log(pixData);
                const pixabayData = pixData;
                postData('/pix',pixabayData);
            });
           
        });
}

export const removeTrip = () => { //
    document.getElementById('temp').innerHTML = '';
    document.getElementById('duration').innerHTML = '';
    document.getElementById('content').innerHTML = '';
    document.getElementById('countryInfo').innerHTML = '';
    localStorage.removeItem('temp');
    localStorage.removeItem('content');
    localStorage.removeItem('countryInfo');
    localStorage.removeItem('duration');
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

  
    const daysLeft = subtractDates(today,userDate);
    return daysLeft;
}

export const updateUI = async (duration) => {
    
    //
    const dura = 'Duration of the trip: '+duration;
    document.getElementById('duration').innerHTML = dura;
    localStorage.setItem('duration',dura);
    //
    getData('/weather')
    .then((data)=>{
        const userDate = document.getElementById('date').value;
//compare between dates (transfer them to miliseconds)
        let a = new Date(userDate).getTime();
        let counter = 1;
        let temp='';
        for (let i = 0; i < data.length; i++) {
            let b= new Date(data[i].datetime).getTime();
            if (b >= a) {
                console.log(data[i]);
                temp += `Day${counter}: ${data[i].temp}C ${data[i].weather.icon} `;
                document.getElementById('temp').innerHTML= temp;
                localStorage.setItem('temp',temp);
                if(counter==5){
                    break;
                }
                counter++;
            }
          }
    });
    //
    getData('/country')
        .then((data)=>{
            const countryInfo = `The counrty you want to visit is ${data.name}, and the capital city there is ${data.capital}. ${data.name} is located in ${data.region} region, and the population is estimated at ${data.population} people. The main language in ${data.name} is ${data.language} language, and ${data.currency} is the official currency of ${data.name}. ${data.timezone} is the time zone used in ${data.name}.`;
            document.getElementById('countryInfo').innerHTML = countryInfo;
            localStorage.setItem('countryInfo',countryInfo);
        });
    //
    getData('/pix')
    .then((data)=>{
        const content = `<img src=${data.hits[0].webformatURL} alt=${city} style="width: 500px; height: 350px;">`;
        document.getElementById('content').innerHTML = content;
        localStorage.setItem('content',content);
    })
    .catch((error)=>{
        console.log(error);
        const content = 'No appropriate image is found';
        document.getElementById('content').innerHTML = content;
        localStorage.setItem('content',content);
    });

}


export const subtractDates = (dateOne,dateTwo) => {
    const d1 = Date.parse(dateOne);
    const d2 = Date.parse(dateTwo);
  
    const difference = d2 - d1;
  
    const result = Math.ceil(difference / 86400000);
    console.log(result);
    return result;
}


export const getFromCountryAPI = async (countData) => { //
    const country = countData.country;

    const request = await fetch(countriesAPI+country);
    try{
        const newData = await request.json();
        return newData;
    }catch(error){
        console.log(error);
    }
}

export const getFromLocalStorage = () => {
    document.getElementById('temp').innerHTML = localStorage.getItem('temp');
    document.getElementById('duration').innerHTML = localStorage.getItem('duration');
    document.getElementById('content').innerHTML = localStorage.getItem('content');
    document.getElementById('countryInfo').innerHTML = localStorage.getItem('countryInfo');
}