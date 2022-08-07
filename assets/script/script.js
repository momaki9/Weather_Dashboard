var tempDisplay = $('#temp')
var windDisplay = $('#wind')
var humididtyDisplay = $('#humidity')
var uvindexDisplay = $('#uv-index')
var input = $('.city-input')

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

    // console.log(storedLat.toFixed(2))

    // var roundedStoredLat = storedLat.val().toFixed(2);

    // var roundedStoredLon = storedLon.val().toFixed(2);

    var weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${storedLat}&lon=${storedLon}&exclude=minutely,hourly,daily&appid=f57f9a13f3296d2929f153a072066d23`;

    getWeatherApi();

    function getWeatherApi() {
        var requestUrl = weatherUrl;
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
        });
    }


})

