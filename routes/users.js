const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const router = express.Router();
const fs = require("fs");
const path = require("path");

var upload = require("../app").upload;

const {
  ensureAuthenticated,
  ensurenotAuthenticated,
} = require("../passport/auth");

//user schema
const User = require("../model/User");

//get router
router.get("/register", ensurenotAuthenticated, (req, res) => {
  res.render("register");
});

router.get("/login", ensurenotAuthenticated, (req, res) => {
  res.render("login");
});

//register post router
router.post("/register", (req, res) => {
  const { name, email, weight, height, password, password2 } = req.body;
  let errors = [];
  if (!name || !email || !weight || !height || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }
  if (password.length < 6) {
    errors.push({ msg: "Password should be atleast 6 characters" });
  }
  if (ValidateEmail(email) == false) {
    errors.push({ msg: "You have entered an invalid email address!" });
  }

  if (errors.length > 0) {
    res.render("register", { errors, name, email, weight, height });
  } else {
    //pass
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email is already registered" });
        res.render("register", { errors });
      } else {
        const newUser = new User({ name, email, password, weight, height });
        //hash password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              throw err;
            }
            newUser.password = hash;
            //save user
            newUser
              .save()
              .then(() => {
                req.flash(
                  "success_msg",
                  "You are now registered and can login"
                );
                res.redirect("/stamina/users/login");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

//login post router
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/stamina/home",
    failureRedirect: "/stamina/users/login",
    failureFlash: true,
  })
);

//logout handle
router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

//profile
router.get("/profile", ensureAuthenticated, (req, res) => {
  res.render("profile", { user: req.user });
});

//email validation function block
function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  // alert("You have entered an invalid email address!");
  return false;
}

module.exports = router;
