import {generateListener,getCountdown,getFromGeonames,getFromWeatherbit,getData,updateUI,postData} from '../client/js/geonames';
import '../client/styles/style.scss';
//click listener to execute getData function
const generate = document.getElementById('generate');
generate.addEventListener('click', generateListener);

export{
    generateListener,
    getCountdown,
    getFromGeonames,
    getFromWeatherbit,
    getData,
    updateUI,
    postData
}
