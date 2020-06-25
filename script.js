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