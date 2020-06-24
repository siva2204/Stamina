const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const router = express.Router();

const {
  ensureAuthenticated,
  ensurenotAuthenticated,
} = require("../passport/auth");

const User = require("../model/User");

router.get("/register", ensurenotAuthenticated, (req, res) => {
  res.render("register");
});

router.get("/login", ensurenotAuthenticated, (req, res) => {
  res.render("login");
});

router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];
  if (!name || !email || !password || !password2) {
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
    res.render("register", { errors, name, email });
  } else {
    //pass
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email is already registered" });
        res.render("register", { errors });
      } else {
        const newUser = new User({ name, email, password });
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
  req.flash("success_msg", "You are logged out");
  res.redirect("/");
});

function ValidateEmail(mail) {
  if (
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value)
  ) {
    return true;
  }
  // alert("You have entered an invalid email address!");
  return false;
}

module.exports = router;
