function plusrounds() {
  var rounds = document.getElementById("rounds");
  var changerounds = parseInt(rounds.innerHTML) + 1;
  rounds.innerHTML = changerounds;
}

function minusrounds() {
  var rounds = document.getElementById("rounds");
  if (parseInt(rounds.innerHTML) > 0) {
    var changerounds = parseInt(rounds.innerHTML) - 1;
    rounds.innerHTML = changerounds;
  }
}

function plustimeon() {
  var minutes = parseInt(document.getElementById("timeon-m").innerHTML);
  var seconds = parseInt(document.getElementById("timeon-s").innerHTML);

  seconds += 1;
  if (seconds === 60) {
    minutes += 1;
    seconds = 0;
  }

  if (minutes < 9 && minutes > 0) {
    document.getElementById("timeon-m").innerHTML = "0" + `${minutes}`;
  } else {
    document.getElementById("timeon-m").innerHTML = minutes;
  }

  if (seconds <= 9 && seconds >= 0) {
    document.getElementById("timeon-s").innerHTML = "0" + `${seconds}`;
  } else {
    document.getElementById("timeon-s").innerHTML = seconds;
  }
}

function minustimeon() {
  var minutes = parseInt(document.getElementById("timeon-m").innerHTML);
  var seconds = parseInt(document.getElementById("timeon-s").innerHTML);
  if (seconds >= 0) {
    seconds -= 1;
    if (seconds === 0) {
      minutes -= 1;
      seconds = 59;
    }

    if (minutes <= 9 && minutes >= 0) {
      document.getElementById("timeon-m").innerHTML = "0" + `${minutes}`;
    } else {
      document.getElementById("timeon-m").innerHTML = minutes;
    }

    if (seconds < 9 && seconds > 0) {
      document.getElementById("timeon-s").innerHTML = "0" + `${seconds}`;
    } else {
      document.getElementById("timeon-s").innerHTML = seconds;
    }
  }
}

function plustimeoff() {
  var minutes = parseInt(document.getElementById("timeoff-m").innerHTML);
  var seconds = parseInt(document.getElementById("timeoff-s").innerHTML);

  seconds += 1;
  if (seconds === 60) {
    minutes += 1;
    seconds = 0;
  }

  if (minutes < 9 && minutes > 0) {
    document.getElementById("timeoff-m").innerHTML = "0" + `${minutes}`;
  } else {
    document.getElementById("timeoff-m").innerHTML = minutes;
  }

  if (seconds <= 9 && seconds >= 0) {
    document.getElementById("timeoff-s").innerHTML = "0" + `${seconds}`;
  } else {
    document.getElementById("timeoff-s").innerHTML = seconds;
  }
}

function minustimeoff() {
  var minutes = parseInt(document.getElementById("timeoff-m").innerHTML);
  var seconds = parseInt(document.getElementById("timeoff-s").innerHTML);
  if (seconds >= 0) {
    seconds -= 1;
    if (seconds === 0) {
      minutes -= 1;
      seconds = 59;
    }

    if (minutes <= 9 && minutes >= 0) {
      document.getElementById("timeoff-m").innerHTML = "0" + `${minutes}`;
    } else {
      document.getElementById("timeoff-m").innerHTML = minutes;
    }

    if (seconds < 9 && seconds > 0) {
      document.getElementById("timeoff-s").innerHTML = "0" + `${seconds}`;
    } else {
      document.getElementById("timeoff-s").innerHTML = seconds;
    }
  }
}
