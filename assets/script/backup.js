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


// kind of works but it is 'behind' because of local storage
var dateEl = $('#date');
var tempDisplay = $('#temp')
var windDisplay = $('#wind')
var humididtyDisplay = $('#humidity')
var uvindexDisplay = $('#uv-index')
var input = $('.city-input')


function dateToday() {
    var currentTime = moment().format('(MM/DD/YYYY)');
    dateEl.text(currentTime);
};

$('.srch-btn').on('click', function() {
    var cityInput = input.val();
    var cityUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&appid=f57f9a13f3296d2929f153a072066d23`;

    getGeoCodeApi();

    function getGeoCodeApi() {
        var requestUrl = cityUrl;
        fetch(requestUrl)
        .then(function (response) {
        return response.json();
    })
        .then(function (data) {
        var cityLat = data[0].lat
        localStorage.setItem("city-lat", cityLat.toFixed(2))
        var cityLon = data[0].lon  
        localStorage.setItem("city-lon", cityLon.toFixed(2))
    });
    }

    var storedLat = localStorage.getItem("city-lat")
    var storedLon = localStorage.getItem("city-lon")

   

    var weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${storedLat}&lon=${storedLon}&exclude=minutely,hourly,daily&units=imperial&appid=f57f9a13f3296d2929f153a072066d23`;

    getWeatherApi();

    function getWeatherApi() {
        var requestUrl = weatherUrl;
        fetch(requestUrl)
            .then(function (response) {
            return response.json();
        })
            .then(function (data) {
                console.log(data)
            var currentTemp = $('<span>')
            currentTemp.text(`${data.current.temp}°F`)
            tempDisplay.append(currentTemp)
    
            var currentWind = $('<span>')
            currentWind.text(`${data.current.wind_speed} MPH`)
            windDisplay.append(currentWind)
    
            var currentHumidity = $('<span>')
            currentHumidity.text(`${data.current.humidity} %`)
            humididtyDisplay.append(currentHumidity)
    
            var currentUvi = $('<span>')
            currentUvi.text(data.current.uvi)
            uvindexDisplay.append(currentUvi)
        });
    }


})

dateToday();