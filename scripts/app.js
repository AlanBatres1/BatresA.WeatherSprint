import { APIKEY } from './environment.js';
// current day
let currentTemp = document.getElementById('currentTemp');
let city = document.getElementById('city');
let currentHigh = document.getElementById('currentHigh');
let currentLow = document.getElementById('currentLow');
let currentImg = document.getElementById('currentImg');
let searchBox = document.getElementById('searchBox');
let starBtn = document.getElementById('starBtn');
let star = document.getElementById('star');

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

let currentLocation = '';

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

    // Fetch weather using coordinates
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid=${APIKEY}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Location weather not found');
            }
            return response.json();
        })
        .then((data) => {
            // Use the city name from the geolocation weather data
            currentLocation = data.name;
            apiCall(data.name);
        })
        .catch((error) => {
            console.log('Error fetching geolocation weather:', error);
            // Fallback to Stockton if geolocation weather fetch fails
            apiCall('Stockton');
        });



function errorFunc(error) {
    console.log(error.message);
    apiCall('Stockton');
}

document.addEventListener('DOMContentLoaded', () => {
    // Try to get user's geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, errorFunc, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
    } else {
        // Geolocation is not supported
        console.log('Geolocation is not supported by this browser');
        apiCall('Stockton');
    }

    // Ensure favorites list is updated
    updateFavoritesList();
});

// Favorites Management
function saveFavoriteLocation(location) {
    // Get existing favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem('weatherFavorites') || '[]');

    // Check if location already exists to avoid duplicates
    if (!favorites.includes(location)) {
        favorites.push(location);
        localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
        updateFavoritesList();
    }
}

// Function to load and display favorites list
function updateFavoritesList() {
    // Get favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem('weatherFavorites') || '[]');

    // Clear existing favorites list
    favoritesList.innerHTML = '';

    // Create list items for each favorite
    favorites.forEach(location => {
        const listItem = document.createElement('li');
        listItem.textContent = location;
        listItem.classList.add('favorite-location');

        // Add click event to load weather for this location
        listItem.addEventListener('click', () => {
            apiCall(location);
            searchBox.value = location;
        });

        // Add delete button for each favorite
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '✖';
        deleteBtn.classList.add('delete-favorite');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering location load
            removeFavoriteLocation(location);
        });

        listItem.appendChild(deleteBtn);
        favoritesList.appendChild(listItem);
    });
}

// Function to remove a favorite location
function removeFavoriteLocation(location) {
    let favorites = JSON.parse(localStorage.getItem('weatherFavorites') || '[]');
    favorites = favorites.filter(fav => fav !== location);
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
    updateFavoritesList();
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

    currentLocation = cityName;

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
            currentHigh.innerText = 'High:' + Math.round(data.main.temp_max) + '°F';
            currentLow.innerText = 'Low:' + Math.round(data.main.temp_min) + '°F';
            currentImg.src = getWeatherIcon(data.weather[0].main);

            // Check if current location is in favorites
            let favorites = JSON.parse(localStorage.getItem('weatherFavorites') || '[]');
            if (favorites.includes(data.name)) {
                star.src = "./assets/star (1).png";
                isClicked = true;
            } else {
                star.src = "./assets/star.png";
                isClicked = false;
            }
        })

    fetch(forecastUrl + cityName + `&appid=${APIKEY}`)
        .then((response) => {

            return response.json();
        })
        .then((data) => {
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
            forecastEntries.slice(0, 5).forEach((forecast, index) => {
                const forecastData = forecast[1];
                const dayElement = forecastDays[index];

                const forecastDate = new Date(forecastData.dt * 1000);
                dayElement.element.innerText = forecastDate.toLocaleDateString('en-US', { weekday: 'short' });

                dayElement.tempElement.innerText = Math.round(forecastData.main.temp) + '°F';

                dayElement.imgElement.src = getWeatherIcon(forecastData.weather[0].main);
            });
        })
        .catch((error) => {
            alert('Unable to find city. Please try again.');
        });
}

searchBox.addEventListener('keypress', function (event) {
    if (event.key == 'Enter') {
        const location = searchBox.value.trim();
        if (location) {
            apiCall(location);
        }
    }
});

let isClicked = false;

starBtn.addEventListener('click', () => {
    if (isClicked) {
        // Removing favorite
        star.src = "./assets/star.png";
        removeFavoriteLocation(currentLocation);
        isClicked = false;
    } else {
        // Adding favorite
        star.src = "./assets/star (1).png";
        saveFavoriteLocation(currentLocation);
        isClicked = true;
    }
});

// Initialize favorites list on page load
document.addEventListener('DOMContentLoaded', () => {
    updateFavoritesList();

    // If a default location is set, call its weather
    const defaultLocation = 'Stockton'; // You can change this to any default location
    apiCall(defaultLocation);
});