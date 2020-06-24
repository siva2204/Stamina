function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function openForm() {
  document.getElementById("LoginForm").style.display = "block";
  document.getElementById("RegisterForm").style.display = "none";
}

function closeForm() {
  document.getElementById("LoginForm").style.display = "none";
}

function openRForm() {
  document.getElementById("RegisterForm").style.display = "block";
  document.getElementById("LoginForm").style.display = "none";
}

function closeRForm() {
  document.getElementById("RegisterForm").style.display = "none";
}
