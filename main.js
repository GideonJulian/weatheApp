// Create a new Date object
var currentDate = new Date();

// Get the current time
var hours = currentDate.getHours();
var minutes = currentDate.getMinutes();
var seconds = currentDate.getSeconds();


var timeHtml = document.querySelector('.time')
var currentTime =  hours + ':' + minutes
// Display the current time
timeHtml.innerHTML = currentTime
var conditionHtml = document.querySelector('.condition')
var searchBtn = document.querySelector('.searchBtn')
searchBtn.addEventListener('click', FetchData)

// getting weather
function FetchData() {
  var input = document.querySelector('.search').value;
  const Apikey = 'd7474d5cd2338b55399957bccd8e584e';
  const apiKey = 'f5524e9dabb54f17bcdbdd89c46aff55';
  const city = input;
  const cityName = document.querySelector('.location')
  cityName.innerHTML = input

  const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.results.length > 0) {
        const location = data.results[0].geometry;
        const latitude = location.lat;
        const longitude = location.lng;
        alert(`Latitude: ${latitude}, Longitude: ${longitude}`);
        console.log(data);

        // Move the second fetch block inside this .then block
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&lat=${latitude}&lon=${longitude}&appid=${Apikey}`)
          .then(res => res.json())
          .then(weatherData => {
            // Process the weather data and update your app UI
            const temperatureCelsius = weatherData.main.temp - 273.15;
            console.log(weatherData, temperatureCelsius);
          })
          .catch(error => {
            console.error('Error fetching weather data:', error);
          });
      } else {
        alert('City not found. Please enter a valid city name.');
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}
