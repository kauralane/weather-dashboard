$(function () {

    const APIkey = "a69ab5ecb3b3c6e1ed7ac0baa202eabb"
    // let cityInput = $('#search-input').val().trim();

    // if there is no weather being displayed, automatically display the weather for London, UK
    if ($('#today').empty()) {
        const coordURL = `http://api.openweathermap.org/geo/1.0/direct?q=London&appid=${APIkey}`

// Need to add code to retrieve last 5 values from local storage and render them as buttons on refresh/open

        fetch(coordURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                getLatLon(data);
            })
    }

    // On submit, use the coordinates API key to turn the city name that the user has inputted into latitude and longitude. Then run a fetch with the base API key, using those coordinates. 

    $('#search-form').on('submit', function (e) {
        e.preventDefault();

        // Empty out the previous search results (if any), and make the today and 5 day forecast headings visible
        $('#today').empty()
        $('#forecast').empty()

        let cityInput = $('#search-input').val().trim();
        saveSearch(cityInput);

// run a fetch to get the coordinates of the city input
        const coordURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&appid=${APIkey}`

        fetch(coordURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                getLatLon(data);
            })
    })

// function to get lat and lon from first fetch
    function getLatLon(data) {
        let lat = data[0].lat;
        let lon = data[0].lon;
        getWeatherToday(lat, lon);
        getWeatherForecast(lat, lon)
    }

// function to get weather for today 
    function getWeatherToday(lat, lon) {
        const baseURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`

        fetch(baseURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
    
                let cityName = $('<h4>').text(`City: ${data.name}`);
                let iconCode = (data.weather[0].icon);

                //add icon code to the relevant URL and set it as the img source
                let icon = $('<img>').attr('src', `https://openweathermap.org/img/wn/${iconCode}@2x.png`)

                let temp = $('<p>').text(`Temperature: ${data.main.temp}°C`);
                let humidity = $('<p>').text(`Humidity: ${data.main.humidity} %`);
                let wind = $('<p>').text(`Wind speed: ${data.wind.speed} metres/second`);

                $('#today').append(cityName, icon, temp, humidity, wind)

                // clear the input box ready for the next search
                $('#search-input').val("")
            })
    }

    // get 5 day weather forecast
function getWeatherForecast(lat, lon) {
const baseURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${APIkey}`

    fetch(baseURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

// for loop to find the forecast for the same time point at each day; in this case it is every 8th object in the 'list' array from the API
            for (let i = 0; i < data.list.length; i += 8) {

            let date = $('<p>').text(`Date and time: ${data.list[i].dt_txt}`);
            let iconCode = (data.list[i].weather[0].icon);

            //add icon code to the relevant URL and set it as the img source
            let icon = $('<img>').attr('src', `https://openweathermap.org/img/wn/${iconCode}@2x.png`)

                let temp = $('<p>').text(`Temperature: ${data.list[i].main.temp}°C`);
            let humidity = $('<p>').text(`Humidity: ${data.list[i].main.humidity}%`);
            let wind = $('<p>').text(`Wind speed: ${data.list[i].wind.speed} metres/second`);

            $('#forecast').append(date, icon, temp, humidity, wind)
            }
})
}

function saveSearch(cityInput) {

    if (cityInput !== "") {
    let cityButton = $('<button>').text(cityInput).addClass('cityButton').data('cityName', cityInput);
    $('#history').append(cityButton);

    let citiesArray = JSON.parse(localStorage.getItem('cities')) || [];
    citiesArray.push(cityInput)

    localStorage.setItem('cities', JSON.stringify(citiesArray))
    }
}

// not yet functioning
function renderHistory() {
    let prevCities = JSON.parse(localStorage.getItem('cities'));
    console.log(prevCities)
    // for (let i = 0; i < 6; i++) {
    //     const element = cities[i];
        
    // }
    
}

$('#history').on('click', '.cityButton', function () {
    let cityName = $(this).data('cityName')

    // Empty out the previous search results (if any), and make the today and 5 day forecast headings visible
    $('#today').empty()
    $('#forecast').empty()

    const coordURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${APIkey}`

    fetch(coordURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            getLatLon(data);
        })
})

})