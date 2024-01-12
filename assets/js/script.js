const APIkey = "a69ab5ecb3b3c6e1ed7ac0baa202eabb"

// On submit, use the coordinates API key to turn the city name that the user has inputted into latitude and longitude. Then run a fetch with the base API key, using those coordinates. 

$('#search-form').on('submit', function (e) {
    e.preventDefault();

    const cityInput = $('#search-input').val().trim();

    const coordURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&appid=${APIkey}`

    fetch(coordURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
    let lat = console.log(data[0].lat)
    let lon = console.log(data[0].lon)

    const baseURL = `https://api.openweathermap.org/data/2.5/forecast?lat=51.5073219&lon=-0.1276474&units=metric&appid=${APIkey}`

        fetch(baseURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data)
            })
    })
})


