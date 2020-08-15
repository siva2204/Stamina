const express = require("express");
const router = express.Router();
const User = require("../model/User.js");
const WorkoutPlans = require("../model/workoutplan");

const {
  ensureAuthenticated,
  ensurenotAuthenticated,
} = require("../passport/auth");
const { json } = require("express");

//home page
router.get("/home", ensureAuthenticated, (req, res) => {
  res.render("home", { name: req.user.name });
});

//report page
router.get("/report", ensureAuthenticated, async (req, res) => {
  try {
    let bmiarray = req.user.BMI;
    var bmivalue = [];
    var dates = [];
    bmiarray.forEach((element, i) => {
      bmivalue.push(element.bmi);
      dates.push(element.currentdate);
    });

    res.render("report", { dates: dates, bmivalue: bmivalue });
  } catch (error) {
    console.log(error);
  }
});

//bmi report
router.post("/report/bmi", ensureAuthenticated, async (req, res) => {
  try {
    let bmireport = bmicalculator(req.body.weight, req.body.height);
    let user = await User.findById(req.user.id);

    user.BMI.push({
      bmirange: bmireport[0],
      bmi: bmireport[1].toFixed(2),
      currentdate: date(),
    });
    await user.save();
    res.redirect("/stamina/report");
  } catch (error) {
    console.log(error);
  }
});

//reminder page
router.get("/reminder", ensureAuthenticated, async (req, res) => {
  let reqwater = req.user.weight * 33;
  let user = await User.findById(req.user.id);
  let array = user.dailydrinktarget;
  var mlvalue;
  if (array.length == 0) {
    mlvalue = 0;
  } else {
    if (array[array.length - 1].date == date()) {
      mlvalue = array[array.length - 1].ml;
    } else {
      mlvalue = 0;
    }
  }
  res.render("reminder", {
    user: req.user,
    reqwater: reqwater,
    mlvalue: mlvalue,
  });
});

//workoutplans
router.get("/workoutplans", ensureAuthenticated, async (req, res) => {
  let plans = await WorkoutPlans.find({ userid: req.user.id }).sort({
    date: "desc",
  });
  res.render("workoutplans", { user: req.user, plans: plans });
});

//deleteworkoutplan
router.get(
  "/workoutplans/delete/:id",
  ensureAuthenticated,
  async (req, res) => {
    let id = req.params.id;
    await WorkoutPlans.findByIdAndDelete(id);
    res.redirect("/stamina/workoutplans");
  }
);

//create workout plan
router.post("/workoutplan", ensureAuthenticated, async (req, res) => {
  try {
    let workoutplan = new WorkoutPlans({
      userid: req.user._id,
      planname: req.body.planname,
      description: req.body.description,
      goal: req.body.goal,
      duration: req.body.duration,
    });

    await workoutplan.save();
    res.redirect(`/stamina/workoutplan/${workoutplan._id}`);
  } catch (error) {
    console.log(error);
    res.redirect("/stamina/workoutplans");
  }
});
// plan
router.get("/workoutplan/:id", ensureAuthenticated, async (req, res) => {
  let plan = await WorkoutPlans.findById(req.params.id);
  res.render("plan", { plan: plan });
});

//day i
router.post("/workoutplan/:day/:id", async (req, res) => {
  var day = "day" + `${req.params.day}`;
  let plan = await WorkoutPlans.findById(req.params.id);

  try {
    plan[day] = Object.values(req.body);
    await plan.save();
    res.redirect(`/stamina/workoutplan/${plan._id}`);
  } catch (error) {
    console.log(err);
    res.send("something went wrong!");
  }
});

router.post("/dailydrinktarget", ensureAuthenticated, async (req, res) => {
  var valueml = req.body.input;
  try {
    const user = await User.findById(req.user._id);
    if (user.dailydrinktarget.length !== 0) {
      if (
        user.dailydrinktarget[user.dailydrinktarget.length - 1].date == date()
      ) {
        var array = user.dailydrinktarget;
        array[array.length - 1].ml = req.body.ml;
        User.findByIdAndUpdate(
          { _id: req.user.id },
          { dailydrinktarget: array },
          { upsert: true },
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );
      } else {
        user.dailydrinktarget.push({ ml: valueml, date: date() });
      }
    } else {
      user.dailydrinktarget.push({ ml: valueml, date: date() });
    }
    await user.save();
    console.log(await User.findById(req.user._id));
    console.log(valueml, req.body.input);
    res.redirect("/stamina/reminder");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

//bmi calculator function
const bmicalculator = (weight, height) => {
  let bmi = weight / (height / 100) ** 2;

  if (bmi < 18.5) {
    return ["Underweight", bmi];
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return ["Normalweight", bmi];
  } else if (bmi >= 25 && bmi <= 29.9) {
    return ["Pre-obesity", bmi];
  } else if (bmi >= 30 && bmi <= 34.9) {
    return ["Obesity Class I", bmi];
  } else if (bmi >= 35 && bmi <= 39.9) {
    return ["Obesity Class II", bmi];
  } else {
    return ["Obesity Class III", bmi];
  }
};

//current Date
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
