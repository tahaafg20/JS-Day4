// TODO: Write your JS code in here
import $ from 'jquery';
import 'select2';

$('#city-input').select2();

const cities = ["Amsterdam", "Bali", "Barcelona", "Berlin", "Brussels", "Buenos Aires", "Chengdu", "Copenhagen", "Kyoto", "Lisbon", "London", "Melbourne", "Mexico", "Milan", "Montréal", "Paris", "Rio de Janeiro", "São Paulo", "Shanghai", "Shenzhen", "Singapore", "Tokyo"];

$('#city-input').select2({
  data: cities
}); // <-- add the `data` option

function getWeather(e) {
  e.preventDefault();
  var key = "1f09a28778871855632611108dd5a800";
  var givenCity = input.value;
  // fetch("https://api.openweathermap.org/data/2.5/weather?id=" +  + '&appid=' + key)
  var url = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=" + `${givenCity}` + "&appid=" + key;
  fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(function (resp) {
      return resp.json();
    }) // Convert data to json
    .then(function (data) {
      showWeather(data) // showWeather(data);


    })
    .catch(function () {
      // catch any errors
    });
}

function showWeather(d) {
  var celcius = Math.round(parseFloat(d.main.temp) - 273.15);
  var fahrenheit = Math.round(((parseFloat(d.main.temp) - 273.15) * 1.8) + 32);
  var humidity = Math.round(parseFloat(d.main.humidity));

  document.getElementById('humidity').innerHTML = "Humidity is " + humidity + " percentage";
  document.getElementById('temp').innerHTML = celcius + '&deg;';
  document.getElementById('location').innerHTML = d.name;
  document.getElementById('description').innerHTML = d.weather[0].description;
}

var form = document.querySelector("#myForm");
var list = document.querySelector("#city-input");
var input = document.querySelector("#input");
form.addEventListener("submit", getWeather);
$(".select2").on('select2:select', copyValue);
function copyValue() {
  input.value = list.value;
}
var currentTemp = document.querySelector("#currentTemp");
currentTemp.addEventListener("click", navigator.geolocation.getCurrentPosition((data) => {
  var lat = data.coords.latitude;
  var long = data.coords.longitude;
  var key = "1f09a28778871855632611108dd5a800";
  var locationUrl = "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat="+ lat + "&lon=" + long + "&appid=" + key;
  fetch(locationUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(function (resp) {
          return resp.json();
        }) // Convert data to json
        .then(function (data) {
          showWeather(data);// showWeather(data);
        })
        .catch(function () {
          // catch any errors
        });
    }
));
