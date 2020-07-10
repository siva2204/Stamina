//registering service worker

function registerServiceWorker() {
  navigator.serviceWorker
    .register("../js/service-worker.js")
    .then((registration) => {
      console.log("ServiceWorker registered with scope:", registration.scope);
    })
    .catch((e) => console.error("ServiceWorker failed:", e));
}
if (navigator && navigator.serviceWorker) {
  registerServiceWorker();
}

//permission to push notification
const permission = Notification.requestPermission();
if (permission !== "granted") {
  // no notifications
} else {
  // yay notifications
}
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
