var tempDisplay = $('#temp')
var windDisplay = $('#wind')
var humididtyDisplay = $('#humidity')
var uvindexDisplay = $('#uv-index')

var input = $('.city-input')

$('.srch-btn').on('click', function() {
    var cityInput = input.val();
    
    
})


var city = 'london';

var lat = 33.68;
var long = -117.83;

var weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly,daily&appid=f57f9a13f3296d2929f153a072066d23`;

var cityUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=f57f9a13f3296d2929f153a072066d23`;
// console.log(getUrl)

function getGeoCodeApi() {
    // fetch request gets a list of all the repos for the node.js organization
    var requestUrl = cityUrl;
    // var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=London&appid=f57f9a13f3296d2929f153a072066d23';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
    })
      .then(function (data) {
        // console.log(data[0].lat)
        // console.log(data[0].lon)   
    }
    );
}

function getWeatherApi() {
    // fetch request gets a list of all the repos for the node.js organization
    var requestUrl = weatherUrl;
    // var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.68&lon=-117.83&exclude=minutely,hourly,daily&appid=f57f9a13f3296d2929f153a072066d23';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
    })
      .then(function (data) {
        var currentTemp = $('<span>')
        currentTemp.text(data.current.temp)
        tempDisplay.append(currentTemp)

        var currentWind = $('<span>')
        currentWind.text(data.current.wind_speed)
        windDisplay.append(currentWind)

        var currentHumidity = $('<span>')
        currentHumidity.text(data.current.humidity)
        humididtyDisplay.append(currentHumidity)

        var currentUvi = $('<span>')
        currentUvi.text(data.current.uvi)
        uvindexDisplay.append(currentUvi)

        // console.log(data)
        // console.log(data.current.wind_speed)
    }
    );
}

getGeoCodeApi();
getWeatherApi();