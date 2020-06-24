const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../model/User");

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/register", (req, res) => {
  res.send("registering");
});

router.post("/login", (req, res) => {
  res.send("logging in");
});

module.exports = router;
