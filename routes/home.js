const express = require("express");
const router = express.Router();

const {
  ensureAuthenticated,
  ensurenotAuthenticated,
} = require("../passport/auth");

router.get("/home", ensureAuthenticated, (req, res) => {
  res.render("home", { name: req.user.name });
});

module.exports = router;
