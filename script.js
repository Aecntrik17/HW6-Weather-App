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