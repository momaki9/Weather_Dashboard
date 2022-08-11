// Variable declarations
var dateEl = $('#date')
var cityEl = $('#city-name')
var tempDisplay = $('#temp')
var input = $('.city-input')
var searchHistory = $('.search-history')
var testEl = localStorage.getItem("city")
//Setting the searched cities as an empty array to be 'filled' from user input
var searchedCities = [];
//Click event listener for the search button to call the showWeather function
$('.srch-btn').on('click', showWeather)
//Function that loads on start up page and accesses the stored city searched if there are any
function init() {
    if (testEl !== null) {
        var storedEl = testEl.split(',')
        searchedCities.push(storedEl);
        for (var i = 0; i < storedEl.length; i++) {
        var searchEl = $('<li>');
        searchEl.attr("class", "list-group-item list-group-item-dark li-custom")
        searchEl.text(storedEl[i]);
        searchHistory.append(searchEl);
        }
    }
};
//Function to set the current date
function dateToday() {
    var currentTime = moment().format('(dddd - MM/DD/YYYY)');
    dateEl.text(currentTime);
    localStorage.getItem("city");
};
//Click event listener for cities within the search history to retrieve the weather info
searchHistory.on('click', function(event) {
    var inputEl = event.target;
    var inputTex = inputEl.textContent;
    cityEl.text(inputTex);
    //constructing the city URL to feed into the geocode api and retrieve the lattitude and longtitude for a searched city
    var cityUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${inputTex}&appid=${api.key}`;
    //calling the running the geocodeapi function
    geoCodeApi();
    function geoCodeApi() {
        var requestUrl = cityUrl;
        fetch(requestUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                //retrieving the lattitude and longtitude and rounding it to 2 decimal places to feed into the weather api
                var cityLat = data[0].lat
                var storedLat = cityLat.toFixed(2)
                var cityLon = data[0].lon  
                var storedLon = cityLon.toFixed(2)
                var weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${storedLat}&lon=${storedLon}&exclude=minutely,hourly&units=imperial&appid=${api.key}`;
                // calling and running the weather api to retrieve the weather data
                weatherApi();   
                function weatherApi() {
                    var requestUrl = weatherUrl;
                    fetch(requestUrl)
                        .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        //link variable to construct the weather icons
                        var link = `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
                        //Adding current weather data
                        $('#main-icon').attr('src', link)
                        $('#temp-value').text(`${data.current.temp.toFixed()}°F`)
                        $('#wind-value').text(`${data.current.wind_speed} MPH`)
                        $('#humidity-value').text(`${data.current.humidity}%`)
                        $('#uv-index-value').text(data.current.uvi)
                        //conditional statements to highlight the value of the UV index based on severity
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
                    // variables for storing the date for the next 5 days for the 5-day forecast    
                    var dayOne = moment().add(1, 'days').format('ddd MM/DD/YY');
                    var dayTwo = moment().add(2, 'days').format('ddd MM/DD/YY');
                    var dayThree = moment().add(3, 'days').format('ddd MM/DD/YY');
                    var dayFour = moment().add(4, 'days').format('ddd MM/DD/YY');
                    var dayFive = moment().add(5, 'days').format('ddd MM/DD/YY');
                    //Sets the text of the elements to have the date values
                    $('#day-one-date').text(dayOne);
                    $('#day-two-date').text(dayTwo);
                    $('#day-three-date').text(dayThree);
                    $('#day-four-date').text(dayFour);
                    $('#day-five-date').text(dayFive);
                    //Holds the weather icon for each day of the 5-day forecast
                    var linkOne = `https://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@2x.png`;
                    var linkTwo = `https://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}@2x.png`;
                    var linkThree = `https://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}@2x.png`;
                    var linkFour = `https://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}@2x.png`;
                    var linkFive = `https://openweathermap.org/img/wn/${data.daily[5].weather[0].icon}@2x.png`;
                    //Sets the icon for each day
                    $('#day-one-icon').attr('src', linkOne);
                    $('#day-two-icon').attr('src', linkTwo);
                    $('#day-three-icon').attr('src', linkThree);
                    $('#day-four-icon').attr('src', linkFour);
                    $('#day-five-icon').attr('src', linkFive);
                    //Sets the temperature for each day
                    $('#day-one-temp').text(`Temp: ${data.daily[1].temp.max.toFixed()}°F`);
                    $('#day-two-temp').text(`Temp: ${data.daily[2].temp.max.toFixed()}°F`);
                    $('#day-three-temp').text(`Temp: ${data.daily[3].temp.max.toFixed()}°F`);
                    $('#day-four-temp').text(`Temp: ${data.daily[4].temp.max.toFixed()}°F`);
                    $('#day-five-temp').text(`Temp: ${data.daily[5].temp.max.toFixed()}°F`);
                    //Sets the wind speed for each day
                    $('#day-one-wind').text(`Wind: ${data.daily[1].wind_speed} MPH`);
                    $('#day-two-wind').text(`Wind: ${data.daily[2].wind_speed} MPH`);
                    $('#day-three-wind').text(`Wind: ${data.daily[3].wind_speed} MPH`);
                    $('#day-four-wind').text(`Wind: ${data.daily[4].wind_speed} MPH`);
                    $('#day-five-wind').text(`Wind: ${data.daily[5].wind_speed} MPH`);
                    //Sets the humidity level for each day
                    $('#day-one-hum').text(`Humidity: ${data.daily[1].humidity}%`);
                    $('#day-two-hum').text(`Humidity: ${data.daily[2].humidity}%`);
                    $('#day-three-hum').text(`Humidity: ${data.daily[3].humidity}%`);
                    $('#day-four-hum').text(`Humidity: ${data.daily[4].humidity}%`);
                    $('#day-five-hum').text(`Humidity: ${data.daily[5].humidity}%`);
                })
            }
        }
    )}
})
//This function is called when the user searches for a city and clicks the search button 
//This function does the same as described above, but it is triggered by the search button
function showWeather() {
    var cityInput = input.val();
    if (!cityInput) {
        alert("Please Enter a Valid City Name")
        return;
    }
    cityEl.text(cityInput);
    var cityUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&appid=${api.key}`;
    searchedCities.push(cityInput);
    localStorage.setItem("city", searchedCities);
    var lastCity = searchedCities[searchedCities.length - 1];
    var searchEl = $('<li>');
    searchEl.attr("class", "list-group-item list-group-item-dark li-custom")
    searchEl.text(lastCity)
    searchHistory.append(searchEl);
  
    getGeoCodeApi()

    function getGeoCodeApi() {
        var requestUrl = cityUrl;
        fetch(requestUrl)
            .then(function (response) {
            return response.json();
        })
            .then(function (data) {
                if (data.length === 0) {
                    return init();
                }
            var cityLat = data[0].lat
            var storedLat = cityLat.toFixed(2)
            var cityLon = data[0].lon  
            var storedLon = cityLon.toFixed(2)
            var weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${storedLat}&lon=${storedLon}&exclude=minutely,hourly&units=imperial&appid=${api.key}`;

            getWeatherApi();   

            function getWeatherApi() {
                var requestUrl = weatherUrl;
                fetch(requestUrl)
                    .then(function (response) {
                    return response.json();
                    })
                    .then(function (data) {

                var link = `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`
                $('#main-icon').attr('src', link)
                $('#temp-value').text(`${data.current.temp}°F`)
                $('#wind-value').text(`${data.current.wind_speed} MPH`)
                $('#humidity-value').text(`${data.current.humidity}%`)
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

            $('#day-one-hum').text(`Humidity: ${data.daily[1].humidity}%`)
            $('#day-two-hum').text(`Humidity: ${data.daily[2].humidity}%`)
            $('#day-three-hum').text(`Humidity: ${data.daily[3].humidity}%`)
            $('#day-four-hum').text(`Humidity: ${data.daily[4].humidity}%`)
            $('#day-five-hum').text(`Humidity: ${data.daily[5].humidity}%`)
            });
        }
    });}
}
//calling the functions to run when the site loads
init();
dateToday();