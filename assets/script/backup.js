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


//

searchHistory.on('click', function(event) {
    var inputEl = event.target
    var inputTex = inputEl.textContent
    // console.log(inputTex)
    var cityUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${inputTex}&appid=${api.key}`;
    retreiveGeoCodeApi();

    function retreiveGeoCodeApi() {

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
        })

    var weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${storedLat}&lon=${storedLon}&exclude=minutely,hourly&units=imperial&appid=${api.key}d`;

    retrieveWeatherApi();

    function retrieveWeatherApi() {
        // var requestUrl = weatherUrl;
            fetch(weatherUrl)
                .then(function (response) {
                return response.json();
            })
                .then(function (data) {
                var link = `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`
                $('#main-icon').attr('src', link)
                $('#temp-value').text(`${data.current.temp}°F`)
                $('#wind-value').text(`${data.current.wind_speed} MPH`)
                $('#humidity-value').text(`${data.current.humidity} %`)
                $('#uv-index-value').text(data.current.uvi)

                if (data.current.uvi < 3) {
                $('#uv-index-value').attr("class", "uvi-low")
                }

                if (data.current.uvi >= 3 && data.current.uvi < 6) {
                    $('#uv-index-value').attr("class", "uvi-mod")
                }

                if (data.current.uvi >= 6 && data.current.uvi < 8) {
                    $('#uv-index-value').attr("class", "uvi-hi")
                }

                if (data.current.uvi >= 8 && data.current.uvi < 11) {
                    $('#uv-index-value').attr("class", "uvi-vhi")
                }

                if (data.current.uvi >= 11) {
                    $('#uv-index-value').attr("class", "uvi-ext")
                }

            var dayOne = moment().add(1, 'days').format('dddd MM/DD/YYYY');
            var dayTwo = moment().add(2, 'days').format('dddd MM/DD/YYYY');
            var dayThree = moment().add(3, 'days').format('dddd MM/DD/YYYY');
            var dayFour = moment().add(4, 'days').format('dddd MM/DD/YYYY');
            var dayFive = moment().add(5, 'days').format('dddd MM/DD/YYYY');

            $('#day-one-date').text(dayOne)
            $('#day-two-date').text(dayTwo)
            $('#day-three-date').text(dayThree)
            $('#day-four-date').text(dayFour)
            $('#day-five-date').text(dayFive)

            var linkOne = `https://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@2x.png`
            var linkTwo = `https://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}@2x.png`
            var linkThree = `https://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}@2x.png`
            var linkFour = `https://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}@2x.png`
            var linkFive = `https://openweathermap.org/img/wn/${data.daily[5].weather[0].icon}@2x.png`
           
            $('#day-one-icon').attr('src', linkOne)
            $('#day-two-icon').attr('src', linkTwo)
            $('#day-three-icon').attr('src', linkThree)
            $('#day-four-icon').attr('src', linkFour)
            $('#day-five-icon').attr('src', linkFive)

            $('#day-one-temp').text(`Temp: ${data.daily[1].temp.max}°F`)
            $('#day-two-temp').text(`Temp: ${data.daily[2].temp.max}°F`)
            $('#day-three-temp').text(`Temp: ${data.daily[3].temp.max}°F`)
            $('#day-four-temp').text(`Temp: ${data.daily[4].temp.max}°F`)
            $('#day-five-temp').text(`Temp: ${data.daily[5].temp.max}°F`)

            $('#day-one-wind').text(`Wind: ${data.daily[1].wind_speed} MPH`)
            $('#day-two-wind').text(`Wind: ${data.daily[2].wind_speed} MPH`)
            $('#day-three-wind').text(`Wind: ${data.daily[3].wind_speed} MPH`)
            $('#day-four-wind').text(`Wind: ${data.daily[4].wind_speed} MPH`)
            $('#day-five-wind').text(`Wind: ${data.daily[5].wind_speed} MPH`)

            $('#day-one-hum').text(`Humidity: ${data.daily[1].humidity} %`)
            $('#day-two-hum').text(`Humidity: ${data.daily[2].humidity} %`)
            $('#day-three-hum').text(`Humidity: ${data.daily[3].humidity} %`)
            $('#day-four-hum').text(`Humidity: ${data.daily[4].humidity} %`)
            $('#day-five-hum').text(`Humidity: ${data.daily[5].humidity} %`)
        })
    }
        })
}
})