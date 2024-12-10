import { APIKEY } from './environment.js';   


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
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=37.9577&lon=-121.2908&appid=${APIKEY}`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data);
    })
}
apiCall();
