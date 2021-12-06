import tabDays from "./Utilitaire/gestionTemps.js";

const APIKEY = '03dae57083a63d41bfe06e909c167ad2';
let resultAPI; 

const weather = document.querySelector('.weather');
const degree = document.querySelector('.degree');
const localisation = document.querySelector('.localisation');
const hourName = document.querySelectorAll('.hour-name-forecast');
const hourValue = document.querySelectorAll('.hour-value-forecast');
const dayName = document.querySelectorAll('.day-name-forecast');
const dayValue = document.querySelectorAll('.day-value-forecast');
const logoWeather = document.querySelector('.logo-weather');
const loading = document.querySelector('.overlay-load');

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {

        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        apiCall(lon, lat);

    }, () => {
        alert(`Vous avez refusé la géolocalisation, l'application ne peut pas fonctionner. Veuillez l'activer.`);
    })
}

function apiCall(lon, lat) {
    
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&lang=fr&appid=${APIKEY}`)
    .then((answer) => {
        return answer.json();
    })
    .then((data) => {
        // console.log(data);

        resultAPI = data;

        weather.innerText = resultAPI.current.weather[0].description;
        degree.innerText = `${Math.trunc(resultAPI.current.temp)}°`;
        localisation.innerText = resultAPI.timezone;

        let actualHour = new Date().getHours();

        for (let index = 0; index < hourName.length; index++) {
            
            let hourIncr = actualHour + index * 3;

            if (hourIncr > 24) {
                hourName[index].innerText = `${hourIncr -24} h`;
            } else if ( hourIncr === 24){
                hourName[index].innerText = "00 h";
            } else {
                hourName[index].innerText = `${hourIncr} h`;
            }
        }

        for (let index = 0; index < hourValue.length; index++) {
            hourValue[index].innerText = `${Math.trunc(resultAPI.hourly[index * 3].temp)}°`;
        }

        for (let index = 0; index < tabDays.length; index++) {
            dayName[index].innerText = tabDays[index].slice(0,3);
        }

        for (let index = 0; index < 7; index++) {
            dayValue[index].innerText = `${Math.trunc(resultAPI.daily[index+1].temp.day)}°`;
        }

        if (actualHour >= 6 && actualHour < 21) {
            logoWeather.src = `ressources/jour/${resultAPI.current.weather[0].icon}.svg`
        } else {
            logoWeather.src = `ressources/nuit/${resultAPI.current.weather[0].icon}.svg`
        }

        loading.classList.add('disappearance');

    })
}