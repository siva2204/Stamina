const express = require("express");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const webpush = require("web-push");

const app = express();

const port = 3000 || process.env.port;

require("dotenv").config();

//web push vapid keys
const publicVapidKey = process.env.publicVapidKey;
const privateVapidKey = process.env.privateVapidKey;

webpush.setVapidDetails(
  "mailto:example@yourdomain.org",
  publicVapidKey,
  privateVapidKey
);

// DATABASE CONNECTION
mongoose
  .connect(process.env.mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DATABASE CONNECTED"))
  .catch((err) => console.log(err));

//static file
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "stamina")));

//ejs
app.set("view engine", "ejs");

//passport
require("./passport/passport")(passport);

//bodyParser
app.use(express.urlencoded({ extended: false }));

//express - session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.get("/", (req, res) => {
  res.render("index");
});

//routes middleware
app.use("/stamina/users", require("./routes/users"));
app.use("/stamina", require("./routes/home"));
app.use("/stamina/gymworkout", require("./routes/gymworkout"));

app.listen(port, () => {
  console.log(`server up and running ${port}`);
});
