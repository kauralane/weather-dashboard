const APIkey = "a69ab5ecb3b3c6e1ed7ac0baa202eabb"
let lat = {}
let lon = {}
let cityInput = $('#search-input').val().trim();

// On submit, use the coordinates API key to turn the city name that the user has inputted into latitude and longitude. Then run a fetch with the base API key, using those coordinates. 

$('#search-form').on('submit', function (e) {
    e.preventDefault();

    let cityInput = $('#search-input').val().trim();

    const coordURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&appid=${APIkey}`

    fetch(coordURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log
    lat = data[0].lat
    lon = data[0].lon

    const baseURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${APIkey}`

        fetch(baseURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data)

                // on clicking this button again though, it will need to call out everything from local storage? So that the London weather is displayed again.
                const cityBtn = $('<button>').text(cityInput);
                $('#history').append(cityBtn);

                let cityName = data.city.name;
                let date = data.list[0].dt_txt;
                let icon = data.list[0].weather[0].icon;
                let temp = data.list[0].main.temp;
                let humidity = data.list[0].main.humidity;
                let wind = data.list[0].wind.speed;

                console.log(cityName, date, icon, temp, humidity, wind)

                // clear the input box ready for the next search
                $('#search-input').val("")
        
                
            })
    })

})