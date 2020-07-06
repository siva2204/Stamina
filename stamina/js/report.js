var result = document.getElementById("result");
var bmiresult = document.getElementById("bmiresult");
result.style.color = "#ff3333";
savebtn = document.getElementById("save");
bmibtn = document.getElementById("bmi");
savebtn.style.display = "none";

const bmicalculator = () => {
  var weight = document.getElementById("weight").value;
  var height = document.getElementById("height").value;
  let bmi = weight / (height / 100) ** 2;
  savebtn.style.display = "block";
  bmibtn.style.display = "none";
  if (bmi < 18.5) {
    result.innerHTML = "Underweight";
    bmiresult.innerHTML = bmi.toFixed(2);
    result.style.color = "#ffd633";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    result.innerHTML = "Normalweight";
    bmiresult.innerHTML = bmi.toFixed(2);
    result.style.color = "#00cc44";
  } else if (bmi >= 25 && bmi <= 29.9) {
    result.innerHTML = "Pre-obesity";
    bmiresult.innerHTML = bmi.toFixed(2);
  } else if (bmi >= 30 && bmi <= 34.9) {
    result.innerHTML = "Obesity Class I";
    bmiresult.innerHTML = bmi.toFixed(2);
  } else if (bmi >= 35 && bmi <= 39.9) {
    result.innerHTML = "Obesity Class II";
    bmiresult.innerHTML = bmi.toFixed(2);
  } else {
    result.innerHTML = "Obesity Class III";
    bmiresult.innerHTML = bmi.toFixed(2);
  }
};
