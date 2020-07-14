var publicVapidKey =
  "BGqOywqEj0rWpAQ9JUktHVO6juTzinRFe1i2TrmiHqtIDCPpaPsntHIzTMtFDlkAuUhAbd605sG2xqVWTeGnKfo";

//permission to push notification
if (window.Notification) {
  Notification.requestPermission(() => {
    if (Notification.permission === "granted") {
      registerserviceworker();
    }
  });
}
//creating subcription object
async function registerserviceworker() {
  const register = await navigator.serviceWorker.register(
    "../js/service-worker.js"
  );

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });

  await fetch("http://localhost:3000/subscribe", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
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
