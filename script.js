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

      make sure the div where results go is empty
      $("#five-day-results").empty();
      //   for loop for 5-day forecast terperature results
      for (var i = 1; i < 6; i++) {
        // setting variables with retrieved data from ajax call object
        let date = timeConverter(fiveDayResponse.daily[i].dt);
        let iconFive = fiveDayResponse.daily[i].weather[0].icon;
        let iconFiveIMG =
          "<img src=http://openweathermap.org/img/w/" + iconFive + ".png>";
        let tempFive = (fiveDayResponse.daily[i].temp.day - 273.15) * 1.8 + 32;
        let humidityFive = fiveDayResponse.daily[i].humidity;

        // Dynamically creating card to hold 5 day results
        // Creating a div to hold the searched city information
        var cityDiv = $("<div class='city card-bodytext-white bg-primary'>");

        // Creating an element to have the date displayed
        var pOne = $("<p>").text(date);

        // Displaying the date variable for the loop
        cityDiv.append(pOne);

        // create element for iconFive
        let icon = $(
          "<img src=http://openweathermap.org/img/w/" + iconFive + ".png>"
        );
        cityDiv.append(icon);

        // Creating an element to hold the temperature
        var pThree = $("<p>").text("Temp: (F): " + tempFive.toFixed(1));

        // Appending the temperature
        cityDiv.append(pThree);

        // Creating an element to hold the humidity
        var pFour = $("<p>").text(" Humidity: " + humidityFive + "%");

        // Displaying the humidity
        cityDiv.append(pFour);

        // Putting the new city div into the five day section
        $("#five-day-results").append(cityDiv);
      }
    });
  });
}