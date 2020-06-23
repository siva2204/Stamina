const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  res.send("registering");
});

router.post("/login", (req, res) => {
  res.send("logging in");
});

module.exports = router;
