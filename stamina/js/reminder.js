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
    seconds -= 1;
    if (seconds === -1) {
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
    seconds -= 1;
    if (seconds === -1) {
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
    breaktimer = setInterval(break_timer, 1000);
    state = 0;
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
        realtimer = setInterval(real_timer, 1000);
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
        clearInterval(realtimer);
        rr--;
        if (rr == 0) {
          state = 1;
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
  clearInterval(breaktimer);
  clearInterval(realtimer);
  document.getElementById("minutes").innerHTML = "00";
  document.getElementById("seconds").innerHTML = "00";
  state = 1;
}
