// TODO: Write your JS code in here
var input = document.querySelector("#input");
var button = document.querySelector("#button");
var myForm = document.querySelector("#myForm");
myForm.addEventListener("submit", sendRequest);


function sendRequest(e) {
  var givenLocation = input.value;
  e.preventDefault();
        const sendUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(givenLocation)}.json?access_token=pk.eyJ1IjoidGFoYTIwIiwiYSI6ImNqeWVldGJzaTEwbmQzams0amg0dmlxejIifQ.FaFdb-mx-OVC6eCr_uvGWQ`;
        fetch(sendUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
          })
          .then(response => response.json())
          .then((data) => {
            var coordinates = data.features[0].center;
            mapboxgl.accessToken = 'pk.eyJ1IjoidGFoYTIwIiwiYSI6ImNqeWVldGJzaTEwbmQzams0amg0dmlxejIifQ.FaFdb-mx-OVC6eCr_uvGWQ';
            var map = new mapboxgl.Map({
              container: 'map', // Container ID
              style: 'mapbox://styles/mapbox/streets-v11', // Map style to use
              center: coordinates, // Starting position [lng, lat]
              zoom: 12, // Starting zoom level
            });
            var marker = new mapboxgl.Marker() // initialize a new marker
            .setLngLat(coordinates) // Marker [lng, lat] coordinates
            .addTo(map); // Add the marker to the map
          });
        }

    //     mapboxgl.accessToken = 'pk.eyJ1IjoidGFoYTIwIiwiYSI6ImNqeWVldGJzaTEwbmQzams0amg0dmlxejIifQ.FaFdb-mx-OVC6eCr_uvGWQ';
    //     var map = new mapboxgl.Map({
    //       container: 'map', // Container ID
    //       style: 'mapbox://styles/mapbox/streets-v11', // Map style to use
    //       center: [-122.25948, 37.87221], // Starting position [lng, lat]
    //       zoom: 12, // Starting zoom level
    //     });
    //     var marker = new mapboxgl.Marker() // initialize a new marker
    // .setLngLat([-122.25948, 37.87221]) // Marker [lng, lat] coordinates
    // .addTo(map); // Add the marker to the map
        