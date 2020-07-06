const express = require("express");
const router = express.Router();
const User = require("../model/User.js");

const {
  ensureAuthenticated,
  ensurenotAuthenticated,
} = require("../passport/auth");

router.get("/home", ensureAuthenticated, (req, res) => {
  res.render("home", { name: req.user.name });
});

router.get("/report", ensureAuthenticated, (req, res) => {
  res.render("report", { user: req.user });
});

//bmi
router.post("/report/bmi", ensureAuthenticated, async (req, res) => {
  try {
    let bmireport = bmicalculator(req.body.weight, req.body.height);
    let user = await User.findById(req.user.id);

    user.BMI.push({
      bmirange: bmireport[0],
      bmi: bmireport[1],
      currentdate: new Date(),
    });
    await user.save();
    res.redirect("/stamina/report");
    console.log("saved");
  } catch (error) {
    console.log(error);
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
  today = mm + "-" + dd + "-" + yyyy;
  console.log(today);
  today = mm + "/" + dd + "/" + yyyy;
  console.log(today);
  today = dd + "-" + mm + "-" + yyyy;
  console.log(today);
  today = dd + "/" + mm + "/" + yyyy;
  console.log(today);
};
