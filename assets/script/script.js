var tempDisplay = $('#temp')
var windDisplay = $('#wind')
var humididtyDisplay = $('#humidity')
var uvindexDisplay = $('#uv-index')
var cityInput = $('.city-input')

var lat = 33.68;
var long = -117.83;
var getUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly,daily&appid=f57f9a13f3296d2929f153a072066d23`
// console.log(getUrl)


function getApi() {
    // fetch request gets a list of all the repos for the node.js organization
    var requestUrl = getUrl;
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

        console.log(data)
        // console.log(data.current.wind_speed)
    }
    );
}

getApi();