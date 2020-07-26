import {createTrip,getCountdown,getFromAPI,getFromWeatherbit,getData,updateUI,postData,subtractDates,removeTrip} from '../client/js/app';
import '../client/styles/style.scss';
//click listener to execute getData function
const create = document.getElementById('create');
create.addEventListener('click', createTrip);

const remove = document.getElementById('remove');
remove.addEventListener('click', removeTrip);

export{
    createTrip,
    getCountdown,
    getFromAPI,
    getFromWeatherbit,
    getData,
    updateUI,
    postData,
    subtractDates
}
