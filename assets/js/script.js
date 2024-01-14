$(function () {

const APIkey = "a69ab5ecb3b3c6e1ed7ac0baa202eabb"
let cityInput = $('#search-input').val().trim();

// On submit, use the coordinates API key to turn the city name that the user has inputted into latitude and longitude. Then run a fetch with the base API key, using those coordinates. 

// function getCoords() {
$('#search-form').on('submit', function (e) {
    e.preventDefault();
    let cityInput = $('#search-input').val().trim();

    const coordURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&appid=${APIkey}`

    fetch(coordURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            getLatLon(data);
        })
    })

    function getLatLon(data) {
let lat = data[0].lat;
let lon = data[0].lon;
getWeatherToday(lat, lon);
    }

            function getWeatherToday(lat, lon) {
            const baseURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${APIkey}`

            fetch(baseURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    // console.log(data)

                    // on clicking this button again though, it will need to call out everything from local storage? So that the London weather is displayed again.
                    const cityBtn = $('<button>').text(cityInput);
                    $('#history').append(cityBtn);

                    let cityName = $('<h3>').text(`City: ${data.city.name}`);
                    let date = $('<p>').text(`Date and time: ${data.list[0].dt_txt}`);
                    let iconCode = (data.list[0].weather[0].icon);

                    //add icon code to the relevant URL and set it as the img source
                    let icon = $('<img>').attr('src', `https://openweathermap.org/img/wn/${iconCode}@2x.png`)

                    let temp = $('<p>').text(`Temperature: ${data.list[0].main.temp}`);
                    let humidity = $('<p>').text(`Humidity: ${data.list[0].main.humidity}`);
                    let wind = $('<p>').text(`Wind speed: ${data.list[0].wind.speed}`);

                    $('#today').append(cityName, date, icon, temp, humidity, wind)

                    // clear the input box ready for the next search
                    $('#search-input').val("")
                })
}
})
//     .catch(function (error) {
//         console.log('Weather data not available')
//     })

// }


// $('#search-form').on('submit', function (e) {
//     e.preventDefault();
//     // getCoords()
//     // getData();
// })
