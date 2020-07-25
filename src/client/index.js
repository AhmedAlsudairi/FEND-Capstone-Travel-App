import {generateListener,getCountdown,getFromAPI,getFromWeatherbit,getData,updateUI,postData,subtractDates} from '../client/js/app';
import '../client/styles/style.scss';
//click listener to execute getData function
const generate = document.getElementById('generate');
generate.addEventListener('click', generateListener);

export{
    generateListener,
    getCountdown,
    getFromAPI,
    getFromWeatherbit,
    getData,
    updateUI,
    postData,
    subtractDates
}
