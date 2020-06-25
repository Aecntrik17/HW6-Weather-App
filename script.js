// necessiary variables
var NowMoment = moment();
var currentDate = NowMoment.format(" M / D / YYYY ");
var cities = [];
var welcome = document.querySelector("#welcome");
// this is allowing the initial welcome sign to display as soon as the page opens
welcome.style.display = "block";
