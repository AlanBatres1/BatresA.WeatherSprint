import { APIKEY } from './environment.js';   

let currentTemp = document.getElementById('currentTemp')
let currentLocation = document.getElementById('currentLoction')
let currentHigh = document.getElementById('currentHigh')
let currentLow = document.getElementById('currentLow')
let currentImg = document.getElementById('currentImg')
let day1Temp = document.getElementById('day1Temp')
let day1 = document.getElementById('day1')
let day2Temp = document.getElementById('day2Temp')
let day2 = document.getElementById('day2')
let day3Temp = document.getElementById('day3Temp')
let day3 = document.getElementById('day3')
let day4Temp = document.getElementById('day4Temp')
let day4 = document.getElementById('day4')
let day5Temp = document.getElementById('day5Temp')
let day5 = document.getElementById('day5')


//Geo location is a built in API that allows the user to share there location apon request.

//navigator.geolocation this return geolocation object
//getCurrentPosition method lets the web app get the current position

navigator.geolocation.getCurrentPosition(success, errorFunc);
//You can think of this as an if statment if user accepts we run success else we run errorFunc

//Example of the geolocation Object below
{
    coords: {
        latitude: 32.1234;
        longitude: 13.1234;
    }
}

//If the user accepts we run success function
function success(position){
    console.log(position);
    console.log("Our latitude: " + position.coords.latitude);
    console.log("Our longitude: " + position.coords.longitude);
    console.log("We know where you are!");

}

//If the user denies we run errorFunc
function errorFunc(error){
    console.log(error.message);
}

//Create the apiCall while using the APIKEY from the environment.js file
function apiCall () {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=stockton,ca,us&appid=${APIKEY}&units=imperial`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data);
    })
}
apiCall();
