const express = require("express");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const webpush = require("web-push");
var cors = require("cors");
var fs = require("fs");
var multer = require("multer");
const User = require("./model/User");

const {
  ensureAuthenticated,
  ensurenotAuthenticated,
} = require("./passport/auth");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });
exports.upload = upload;

const app = express();

const port = process.env.port || 3000;

require("dotenv").config();

app.use(cors());

//bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
    useFindAndModify: false,
  })
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

//static file
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "stamina")));

//ejs
app.set("view engine", "ejs");

//passport
require("./passport/passport")(passport);

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

//profile pic update
app.post(
  "/stamina/users/dp",
  ensureAuthenticated,
  upload.single("image"),
  async (req, res, next) => {
    try {
      let user = await User.findById(req.user._id);
      user.img = {
        data: fs.readFileSync(
          path.join(__dirname + "/uploads/" + req.file.filename)
        ),
        contentType: "image/png",
      };
      await user.save();
      res.redirect("/stamina/users/profile");
    } catch (error) {
      console.log(error);
    }
  }
);
//routes middleware
app.use("/", require("./routes/basic"));
app.use("/stamina/users", require("./routes/users"));
app.use("/stamina", require("./routes/home"));
app.use("/stamina/gymworkout", require("./routes/gymworkout"));

app.listen(port, () => {
  console.log(`server up and running ${port}`);
});
console.log(__dirname);
