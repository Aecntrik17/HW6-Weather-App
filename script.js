// necessiary variables
var NowMoment = moment();
var currentDate = NowMoment.format(" M / D / YYYY ");
var cities = [];
var welcome = document.querySelector("#welcome");
// this is allowing the initial welcome sign to display as soon as the page opens
welcome.style.display = "block";

// This .on("click") function will trigger the AJAX Call
$("#searchBtn").on("click", displayCityInfo);

// this function is running the ajax calls, displaying the results in format
function displayCityInfo(event) {
  event.preventDefault();
  // hiding the welcome message once a search is performed
  welcome.style.display = "none";

  // Calling renderButtons which handles the processing of the city array
  renderButtons();

  var cityName = $("#city-search").val();
  // Adding city from the textbox to our array
  cities.push(cityName);
  console.log(cityName);
  $("#city-search").val("");
    // setting API Key for specific query
    var apiKey = "&appid=95cf54f7d36ce72c2810b5fda5b06674";
    //  setting query URL for five day forecast
    var queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + apiKey;
  
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);

          // setting lat and lon variables to that we can call the currentQueryURL
    var lat = response.city.coord.lat;
    var lon = response.city.coord.lon;
    // setting current queryURL, retrieves today's data and next 7 days
    var currentQueryURL =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      apiKey;
    // requesting the JSON object for the current data and next 7 days
    $.ajax({
      url: currentQueryURL,
      method: "GET",
    }).then(function (fiveDayResponse) {
      console.log(fiveDayResponse);

            // retrieve current weather icon
            let icon = fiveDayResponse.current.weather[0].icon;

            // converting the data for ICON to an image
            let iconIMG =
              "<img src=http://openweathermap.org/img/w/" + icon + ".png>";
      
            // retrieve results for City, current date and icon append to the appropriate div
            $(".city-display").html(response.city.name + currentDate + iconIMG);
            // retrieve results for current Humidity and append to the appropriate div and append to html
            $(".humidity").html(
              " Humidity: " + fiveDayResponse.current.humidity + "%"
            );
            // retrieve results for current Wind Speed and append to the appropriate div
            $(".wind-speed").html(
              " Wind Speed: " + fiveDayResponse.current.wind_speed.toFixed(1)
            );
            // set current tempF variable to the results of the conversion of the kalvin within the object
            var tempF = (fiveDayResponse.current.temp - 273.15) * 1.8 + 32;
            // apply termerature text to html
            $(".temp").text("Temperature (F) " + tempF.toFixed(1));
      
            // retrieve results for current UV-Index and append to the appropriate div
            $("#uvi").html(fiveDayResponse.current.uvi);
            // *****************************************************************
      
            let uvi = fiveDayResponse.current.uvi;
      
            // comparing current time to time of slot as it runs through the loop
            if (uvi < 6) {
              // change the color of the line, create "greeen, orange, red" class in css
              $("#uvi").addClass("green");
            } else {
              $("#uvi").addClass("red");
            }

                // converting UNIX code to moment format display
      var UNIX_timestamp = fiveDayResponse.current.dt;
      function timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var time = date + " " + month + " " + year;
        return time;
      }