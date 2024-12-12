import { APIKEY } from './environment.js';
// current day
let currentTemp = document.getElementById('currentTemp');
let city = document.getElementById('city');
let currentHigh = document.getElementById('currentHigh');
let currentLow = document.getElementById('currentLow');
let currentImg = document.getElementById('currentImg');
let searchBox = document.getElementById('searchBox');

// forecast
let day1Img = document.getElementById('day1Img');
let day1Temp = document.getElementById('day1Temp');
let day1 = document.getElementById('day1');
let day2Img = document.getElementById('day2Img');
let day2Temp = document.getElementById('day2Temp');
let day2 = document.getElementById('day2');
let day3Img = document.getElementById('day3Img');
let day3Temp = document.getElementById('day3Temp');
let day3 = document.getElementById('day3');
let day4Img = document.getElementById('day4Img');
let day4Temp = document.getElementById('day4Temp');
let day4 = document.getElementById('day4');
let day5Img = document.getElementById('day5Img');
let day5Temp = document.getElementById('day5Temp');
let day5 = document.getElementById('day5');

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q="
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=";

//Geo location is a built in API that allows the user to share their location upon request.
navigator.geolocation.getCurrentPosition(success, errorFunc);

function success(position) {
    console.log(position);
    console.log("Our latitude: " + position.coords.latitude);
    console.log("Our longitude: " + position.coords.longitude);
    console.log("We know where you are!");
}

function errorFunc(error) {
    console.log(error.message);
}

function getWeatherIcon(weatherMain) {
    switch (weatherMain) {
        case "Clouds":
            return "./assets/03d@2x.png";
        case "Clear":
            return "./assets/01d@2x.png";
        case "Rain":
            return "./assets/10d@2x.png";
        case "Thunderstorm":
            return "./assets/11d@2x.png";
        case "Snow":
            return "./assets/13d@2x.png";
        case "Mist":
        case "Fog":
        case "Haze":
            return "./assets/50d@2x.png";
        default:
            return "./assets/01d@2x.png";
    }
}

//Create the apiCall while using the APIKEY from the environment.js file
function apiCall(cityName) {

    fetch(apiUrl + cityName + `&appid=${APIKEY}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);

            city.innerText = data.name;
            currentTemp.innerText = Math.round(data.main.temp) + '°F';
            currentHigh.innerText = Math.round(data.main.temp_max) + '°F';
            currentLow.innerText = Math.round(data.main.temp_min) + '°F';
            currentImg.src = getWeatherIcon(data.weather[0].main);
        })

    fetch(forecastUrl + cityName + `&appid=${APIKEY}`)
        .then((response) => {

            return response.json();
        })
        .then((data) => {
            // Process forecast data (OpenWeatherMap provides 3-hour interval forecasts)
            const forecastDays = [
                { element: day1, imgElement: day1Img, tempElement: day1Temp },
                { element: day2, imgElement: day2Img, tempElement: day2Temp },
                { element: day3, imgElement: day3Img, tempElement: day3Temp },
                { element: day4, imgElement: day4Img, tempElement: day4Temp },
                { element: day5, imgElement: day5Img, tempElement: day5Temp }
            ];


            const dailyForecasts = {};
            data.list.forEach(forecast => {
                const date = new Date(forecast.dt * 1000);
                const dateString = date.toLocaleDateString();
                if (date.getHours() >= 11 && date.getHours() <= 14) {
                    dailyForecasts[dateString] = forecast;
                }
            });

            // Display forecasts
            const forecastEntries = Object.entries(dailyForecasts);
            forecastEntries.slice(1, 6).forEach((forecast, index) => {
                const forecastData = forecast[1];
                const dayElement = forecastDays[index];

                // Set day name
                const forecastDate = new Date(forecastData.dt * 1000);
                dayElement.element.innerText = forecastDate.toLocaleDateString('en-US', { weekday: 'short' });

                // Set temperature
                dayElement.tempElement.innerText = Math.round(forecastData.main.temp) + '°F';

                // Set weather icon
                dayElement.imgElement.src = getWeatherIcon(forecastData.weather[0].main);
            });
        })
        .catch((error) => {
            alert('Unable to find city. Please try again.');
        });
}

searchBox.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        const location = searchBox.value.trim();
        if (location) {
            apiCall(location);
        }
    }
});


