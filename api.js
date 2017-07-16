const apiURL = "https://uwpce-weather-proxy.herokuapp.com/data/2.5/weather"
const apiId = "93d3fc2c78eb66d0e26103026ba3c019"

const seattleLat = "47.6762"
const seattleLon = "-122.3182"

const londonLat = "51.5074"
const londonLon = "0.1278"

function getSeattle () {
  getWeather(apiURL + "?lat=" + seattleLat + "&lon=" + seattleLon + "&APPID=" + apiId)
}

function getLondon () {
  getWeather(apiURL + "?lat=" + londonLat + "&lon=" + londonLon + "&APPID=" + apiId)
}

function getLocation() {
    navigator.geolocation.getCurrentPosition(myWeather)
}

function myWeather (position) {
  getWeather(apiURL + "?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&APPID=" + apiId)
}

function getWeather(url) {
  let request = new XMLHttpRequest()

  request.open("GET", url, true)


  request.onload = function () {
    let weatherDiv = document.getElementById("weather")

    let response = (JSON.parse(request.response))
    console.log(request.response)

    weatherDiv.innerHTML = ("Temperature: " + (response.body.main.temp - 273.15).toFixed(1) + " degrees Celsius.<br>" +
                            "Today's forecast: " + response.body.weather[0].main + "<br>" +
                            "Description: " + response.body.weather[0].description + "<br>" +
                            "Humidity: " + response.body.main.humidity + "%<br>" +
                            "Wind: " + response.body.wind.speed + "km/h.")
  }

  request.onerror = function (errorObj) {
    console.log("broken")
    console.log(errorObj)
  }

  request.send()



}
