const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();

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

//ejs
app.set("view engine", "ejs");

//bodyParser
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index");
});

//routes middleware
app.use("/stamina/users", require("./routes/user"));

const port = 3000 || process.env.port;
app.listen(3000, () => {
  console.log(`server up and running ${port}`);
});
