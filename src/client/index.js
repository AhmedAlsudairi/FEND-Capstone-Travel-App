import {createTrip,getCountdown,getFromAPI,getFromWeatherbit,getData,updateUI,postData,subtractDates,removeTrip,getFromLocalStorage,getFromCountryAPI} from '../client/js/app';
import '../client/styles/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
document.addEventListener('load',getFromLocalStorage);
//click listener to execute getData function
const create = document.getElementById('create');
create.addEventListener('click', createTrip);

const remove = document.getElementById('remove');
remove.addEventListener('click', removeTrip);

const print = document.getElementById('print');
print.addEventListener('click', ()=>{
    window.print();
});

window.addEventListener('load', getFromLocalStorage);


export{
    createTrip,
    getCountdown,
    getFromAPI,
    getFromWeatherbit,
    getData,
    updateUI,
    postData,
    subtractDates,
    getFromLocalStorage,
    removeTrip,
    getFromCountryAPI
}
