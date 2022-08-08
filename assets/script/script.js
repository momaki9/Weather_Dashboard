var dateEl = $('#date');
var cityEl = $('#city-name')
var tempDisplay = $('#temp')
// var currentTemp = $('#temp-value')
// var windDisplay = $('#wind')
// var currentWind = $('#wind-value')
// var humididtyDisplay = $('#humidity')
// var currentHumidity = $('#humidity-value')
// var uvindexDisplay = $('#uv-index')
// var currentUvi = $('#uv-index-value')
var input = $('.city-input')
// var forecast = $('#forecast')
var searchHistory = $('.search-history')
var searchedCities = [];

localStorage.getItem("cities")


function dateToday() {
    var currentTime = moment().format('(MM/DD/YYYY)');
    dateEl.text(currentTime);
};



$('.srch-btn').on('click', function() {
    var cityInput = input.val();
    cityEl.text(cityInput);
    var cityUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&appid=f57f9a13f3296d2929f153a072066d23`;

    searchedCities.push(input.val())
    localStorage.setItem("cities", searchedCities)
    var searchEl = $('<li>');
    searchEl.attr("class", "list-group-item list-group-item-dark li-custom")
    var lastCity = searchedCities[searchedCities.length - 1]
    searchEl.text(lastCity)
    searchHistory.append(searchEl);

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
                $('#temp-value').text(`${data.current.temp}°F`)
                $('#wind-value').text(`${data.current.wind_speed} MPH`)
                $('#humidity-value').text(`${data.current.humidity} %`)
                $('#uv-index-value').text(data.current.uvi)

                

            var dayOne = moment().add(1, 'days').format('MM/DD/YYYY');
            var dayTwo = moment().add(2, 'days').format('MM/DD/YYYY');
            var dayThree = moment().add(3, 'days').format('MM/DD/YYYY');
            var dayFour = moment().add(4, 'days').format('MM/DD/YYYY');
            var dayFive = moment().add(5, 'days').format('MM/DD/YYYY');
            

            $('#day-one-date').text(dayOne)
            $('#day-two-date').text(dayTwo)
            $('#day-three-date').text(dayThree)
            $('#day-four-date').text(dayFour)
            $('#day-five-date').text(dayFive)

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


            });
        }
    });}

})

$( function() {
    input.autocomplete({
      source: searchedCities
    });
});

dateToday();