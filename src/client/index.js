import {createTrip, getCountdown, getFromPixabayAPI, getFromGeonamesAPI, getFromWeatherbit, getData, updateUI, postData, subtractDates, removeTrip, getFromLocalStorage, getFromCountryAPI, greeting, createListener, removeListener, localStorageListener, greetingListener, printListener } from '../client/js/app';
import '../client/styles/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';


// event listeners
window.addEventListener('load', getFromLocalStorage);
window.addEventListener("load", greeting, false);

const print = document.getElementById('print');
print.addEventListener('click', () => {
    window.print();
});

const create = document.getElementById('create');
create.addEventListener('click', createTrip);

const remove = document.getElementById('remove');
remove.addEventListener('click', removeTrip);


export {
    createTrip,
    getCountdown,
    getFromGeonamesAPI,
    getFromWeatherbit,
    getFromPixabayAPI,
    getData,
    updateUI,
    postData,
    subtractDates,
    getFromLocalStorage,
    removeTrip,
    getFromCountryAPI,
    greeting
}
