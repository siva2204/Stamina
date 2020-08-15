var button0 = new Audio("../mp3/button0.mp3");
var timer0 = new Audio("../mp3/timer0.mp3");
var timer1 = new Audio("../mp3/timer1.mp3");

function plusrounds() {
  var rounds = document.getElementById("rounds");
  var changerounds = parseInt(rounds.innerHTML) + 1;
  rounds.innerHTML = changerounds;
}

function minusrounds() {
  var rounds = document.getElementById("rounds");
  if (parseInt(rounds.innerHTML) > 1) {
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

  if (minutes <= 9 && minutes >= 0) {
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
    if (seconds !== 0 || minutes !== 0) {
      seconds -= 1;
    }

    if (seconds === -1 && minutes > 0) {
      minutes -= 1;
      seconds = 59;
    }

    if (minutes <= 9 && minutes >= 0) {
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
}

function plustimeoff() {
  var minutes = parseInt(document.getElementById("timeoff-m").innerHTML);
  var seconds = parseInt(document.getElementById("timeoff-s").innerHTML);

  seconds += 1;
  if (seconds === 60) {
    minutes += 1;
    seconds = 0;
  }

  if (minutes <= 9 && minutes >= 0) {
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
    if (seconds !== 0 || minutes !== 0) {
      seconds -= 1;
    }
    if (seconds === -1 && minutes > 0) {
      minutes -= 1;
      seconds = 59;
    }

    if (minutes <= 9 && minutes >= 0) {
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
}

var realtimer;
var breaktimer;
var state = 1;

function timer() {
  const t_minutes = parseInt(document.getElementById("timeon-m").innerHTML);
  const t_seconds = parseInt(document.getElementById("timeon-s").innerHTML);
  const b_minutes = parseInt(document.getElementById("timeoff-m").innerHTML);
  const b_seconds = parseInt(document.getElementById("timeoff-s").innerHTML);

  var totalminutes = t_minutes;
  var totalseconds = t_seconds + 1;

  var breakminutes = b_minutes;
  var breakseconds = b_seconds + 1;

  var rounds = parseInt(document.getElementById("rounds").innerHTML);

  if (state == 1) {
    if (t_seconds > 0 || t_minutes > 0) {
      button0.play();
      document.getElementById("time-board").style.borderColor = "#47d147";
      breaktimer = setInterval(break_timer, 1000);
      document.getElementById("start-btn").className =
        "fa fa-circle-o-notch fa-spin fa-3x fa-fw";

      state = 0;
    }
  }

  var rb = rounds;
  var rr = rounds;

  function break_timer() {
    if (breakminutes >= 0 && breakseconds >= 0 && rb > 0) {
      breakseconds--;
      if (breakseconds == 0 && breakminutes > 0) {
        breakminutes--;
        breakseconds = 59;
      }
      if (breakminutes == 0 && breakseconds == 0) {
        document.getElementById("time-board").style.borderColor = "#ff1a1a";
        realtimer = setInterval(real_timer, 1000);
        timer1.play();
        clearInterval(breaktimer);
        rb--;
        totalminutes = t_minutes;
        totalseconds = t_seconds + 1;
      }
      if (breakminutes >= 0 && breakminutes <= 9) {
        document.getElementById("minutes").innerHTML = "0" + `${breakminutes}`;
      } else {
        document.getElementById("minutes").innerHTML = breakminutes;
      }
      if (breakseconds >= 0 && breakseconds <= 9) {
        document.getElementById("seconds").innerHTML = "0" + `${breakseconds}`;
      } else {
        document.getElementById("seconds").innerHTML = breakseconds;
      }
    }
  }

  function real_timer() {
    if (totalminutes >= 0 && totalseconds >= 0 && rr > 0) {
      totalseconds--;
      if (totalseconds == 0 && totalminutes > 0) {
        totalminutes--;
        totalseconds = 59;
      } else if (totalseconds == 0 && totalminutes == 0) {
        breaktimer = setInterval(break_timer, 1000);
        document.getElementById("time-board").style.borderColor = "#47d147";
        clearInterval(realtimer);
        rr--;
        if (rr == 0) {
          state = 1;
          document.getElementById("start-btn").className = "fa fa-play";
          timer0.play();
          document.getElementById("time-board").style.borderColor =
            "rgb(248, 90, 22)";
        }
        breakminutes = b_minutes;
        breakseconds = b_seconds + 1;
      }

      if (totalminutes >= 0 && totalminutes <= 9) {
        document.getElementById("minutes").innerHTML = "0" + `${totalminutes}`;
      } else {
        document.getElementById("minutes").innerHTML = totalminutes;
      }
      if (totalseconds >= 0 && totalseconds <= 9) {
        document.getElementById("seconds").innerHTML = "0" + `${totalseconds}`;
      } else {
        document.getElementById("seconds").innerHTML = totalseconds;
      }
    }
  }
}

function restart() {
  button0.play();
  clearInterval(breaktimer);
  clearInterval(realtimer);
  document.getElementById("minutes").innerHTML = "00";
  document.getElementById("seconds").innerHTML = "00";
  state = 1;
  document.getElementById("start-btn").className = "fa fa-play";
  document.getElementById("time-board").style.borderColor = "rgb(248, 90, 22)";
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementById("closebtn");

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function plusml() {
  var ml = parseInt(document.getElementById("ml").innerHTML);
  ml += 50;
  document.getElementById("ml").innerHTML = ml;
}

function minusml() {
  var ml = parseInt(document.getElementById("ml").innerHTML);
  if (ml > 100) {
    ml -= 50;
  }

  document.getElementById("ml").innerHTML = ml;
}

function addml() {
  var total = parseInt(document.getElementById("total-water").innerHTML);
  var add = parseInt(document.getElementById("ml").innerHTML);
  total += add;
  document.getElementById("total-water").innerHTML = total;
  post("/stamina/dailydrinktarget", total);
}

function post(path, params, method = "post") {
  // The rest of this code assumes you are not using a library.
  // It can be made less wordy if you use one.
  const form = document.createElement("form");
  form.method = method;
  form.action = path;

  const hiddenField = document.createElement("input");
  hiddenField.type = "hidden";
  hiddenField.name = "input";
  hiddenField.value = params;

  form.appendChild(hiddenField);

  document.body.appendChild(form);
  form.submit();
}

const date = () => {
  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = dd + "-" + mm + "-" + yyyy;
  return today;
};
