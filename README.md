# Weather Dashboard
An application to view 5-day weather forecasts for any city across the globe. 

# Description
This application makes use of the OpenWeatherAPI to fetch the current and 5-day weather forecast for any city the user searches. 

The application takes the user's text input and uses OpenWeather's geo-coordinate API to convert the city into latitude and longitute coordinates. 

The application then uses another OpenWeatherAPI to run a fetch for the coordinates of the city. Key weather features are rendered to the page dynamically using jQuery. User searches are also saved to local storage, and rendered as buttons on the page, so that a user can click on a previously searched city and immediately call up the forecast.

# Usage
The user simply needs to search a city in the search box and hit enter or click the submit button. The current weather forecast and a 5-day future forcast will appear.

# Installation
None needed as this runs in the browser, but it does need an API key.

# Credits
CSS reset sheet: github.com/necolas/normalize.css

OpenWeatherAPI