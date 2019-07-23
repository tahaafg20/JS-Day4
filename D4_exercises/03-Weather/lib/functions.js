function getWeather(e) {
    e.preventDefault();
    var key = "1f09a28778871855632611108dd5a800";
    var givenCity = input.value;
    var url = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=" + `${givenCity}` + "&appid=" + key;
    fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(function (resp) {
        return resp.json();
      })
      .then(function (data) {
        showWeather(data);
  
  
      })
      .catch(function () {
      });
  }