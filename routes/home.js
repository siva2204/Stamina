const express = require("express");
const router = express.Router();

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

module.exports = router;
