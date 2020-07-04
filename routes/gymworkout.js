const express = require("express");
const router = express.Router();

router.get("/chest", (req, res) => {
  res.render("chest");
});

router.get("/back", (req, res) => {
  res.render("back");
});

router.get("/leg", (req, res) => {
  res.render("leg");
});

router.get("/triceps", (req, res) => {
  res.render("triceps");
});

router.get("/abs", (req, res) => {
  res.render("abs");
});

router.get("/forearms", (req, res) => {
  res.render("forearms");
});

router.get("/biceps", (req, res) => {
  res.render("biceps");
});

router.get("/shoulder", (req, res) => {
  res.render("shoulder");
});

module.exports = router;
