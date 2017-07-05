const apiURL = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather"
const api = "93d3fc2c78eb66d0e26103026ba3c019"

const seattleLat = "47.6762"
const seattleLon = "-122.3182"

const londonLat = "51.5074"
const londonLon = "0.1278"

function getSeattle () {
  getWeather(apiURL + "?lat=" + seattleLat + "&lon=" + seattleLon + "&APPID=" + api)
}

function getLondon () {
  getWeather(apiURL + "?lat=" + londonLat + "&lon=" + londonLon + "&APPID=" + api)
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(myWeather)
  }
}

function myWeather (position) {
  getWeather(apiURL + "?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&APPID=" + api)
}


// navigator.geolocation.getCurrentPosition(function(position) {
//   myWeather(position.coords.latitude, position.coords.longitude);
// })

// function myWeather (position) {
//   navigator.geolocation.getCurrentPosition(myWeather)
//   getWeather(apiURL + "?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&APPID=" + api)
// }

function getWeather(url) {
  let request = new XMLHttpRequest()

  request.open("GET", url, true)


  request.onload = function () {
    let weatherDiv = document.getElementById("weather")

    let response = (JSON.parse(request.response))
    console.log(response.wind.speed)

    weatherDiv.innerHTML = ("Today's forecast shows " + response.weather[0].main + "." + " It will be " + (response.main.temp - 273.15).toFixed(1) + " degrees Celsius, with up to " + response.main.humidity + "% humidity." + " Your location is expecting winds of up to " + response.wind.speed + "km/h.")
  }

  request.onerror = function (errorObj) {
    console.log("broken")
    console.log(errorObj)
  }

  request.send()



}
