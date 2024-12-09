import { APIKEY } from "./enviroment.js";


// This is a built in API that will allow the user to get their current location upon accepting the prompt

// navigator returns the geolaction object
// getCurrentPosition() returns the current position of the user


navigator.geolocation.getCurrentPosition(success, errorFunc);
// Think of this as if/else statement if the user accepts it is succesful, if not it is an error

{
    cords: {
        latitude: 37.7749;
        longitude: -122.4194;
    }
}

function success(position){
    console.log(position);
    console.log("Our latitude is: " + position.cords.latitude);
    console.log("Our longitude is: " + position.cords.longitude);
    console.log("Now we know where you are!");
}

function errorFunc(error){
    console.log(error.message)
}

success();

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