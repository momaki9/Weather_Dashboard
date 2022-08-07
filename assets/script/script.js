var dateEl = $('#date');
var cityEl = $('#city-name')
var tempDisplay = $('#temp')
var windDisplay = $('#wind')
var humididtyDisplay = $('#humidity')
var uvindexDisplay = $('#uv-index')
var input = $('.city-input')
var forecast = $('#forecast')


function dateToday() {
    var currentTime = moment().format('(MM/DD/YYYY)');
    dateEl.text(currentTime);
};

$('.srch-btn').on('click', function() {
    var cityInput = input.val();
    cityEl.text(cityInput);
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
        var storedLat = cityLat.toFixed(2)
        var cityLon = data[0].lon  
        var storedLon = cityLon.toFixed(2)

        var weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${storedLat}&lon=${storedLon}&exclude=minutely,hourly&units=imperial&appid=f57f9a13f3296d2929f153a072066d23`;

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

                console.log(data.daily)

                for (var i = 1; i < 6; i++) {
                    var divSec = $('<div>')
                    divSec.attr("class", "col-2 bg-dark bg-gradient custom")
                    forecast.append(divSec)

                    var dateEl = $('<h5>');
                    dateEl.text('8/8/22')
                    divSec.append(dateEl)

                    var tempEl = $('<h6>')
                    tempEl.text(`Temp: ${data.daily[i].temp.max}°F`)
                    divSec.append(tempEl)

                    var windEl = $('<h6>')
                    windEl.text(`Wind: ${data.daily[i].wind_speed} MPH`)
                    divSec.append(windEl)

                    var humEl = $('<h6>')
                    humEl.text(`Humidity: ${data.daily[i].humidity} %`)
                    divSec.append(humEl)
                  }
            });
        }
    });
    }

})

dateToday();