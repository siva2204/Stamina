const express = require("express");
const webpush = require("web-push");
const router = express.Router();

const {
  ensureAuthenticated,
  ensurenotAuthenticated,
} = require("../passport/auth");

router.get("/", ensurenotAuthenticated, (req, res) => {
  res.render("index");
});

router.post("/subscribe", async (req, res) => {
  const subscription = req.body;

  const payload = JSON.stringify({ title: `Hello!` });

  webpush.sendNotification(subscription, payload);
});

module.exports = router;
