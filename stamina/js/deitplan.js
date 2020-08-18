const APP_ID = "e4b2dfc6";
const APP_KEY = "6ec088f2717bae2c5bae9ab64d4a908d";

var calorie = document.getElementById("calories");
var protein = document.getElementById("protein");
var calc = document.getElementById("calcium");
var fat = document.getElementById("fat");
var fibre = document.getElementById("fibre");
var carbs = document.getElementById("carbs");

async function fetch_details(str) {
  const response = await fetch(
    `https://api.edamam.com/api/nutrition-data?&app_id=${APP_ID}&app_key=${APP_KEY}&ingr=${str}`
  );
  var nut_details = await response.json();
  return nut_details;
}

function urlencode(str) {
  var replaced = str.split(" ").join("%20");
  return replaced;
}

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  var ing = document.getElementById("ingredeints").value;
  ing.toString();
  var string = urlencode(ing);
  var details = await fetch_details(string);
  console.log(details);
  display(details);
});

function display(details) {
  document.getElementById("result").style.display = "block";
  calorie.innerHTML = details.calories;
  protein.innerHTML = details.totalDaily.PROCNT.quantity;
  calc.innerHTML = details.totalDaily.CA.quantity;
  fat.innerHTML = details.totalDaily.FAT.quantity;
  fibre.innerHTML = details.totalDaily.PROCNT.quantity;
  carbs.innerHTML = details.totalDaily.CHOCDF.quantity;
}
