var express = require("express");
var multer = require("multer");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var upload = multer();
var app = express();

const { UserController } = require("./controllers/userController"); // User control
const DB = require("../database"); // Database

var user = new UserController();

app.set("view engine", "pug"); // pug to html
app.set("views", "./server/views");

// middleware
app.use(cookieParser());
app.use(session({ secret: "Shh, its a secret!" }));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/xwww-
//form-urlencoded
app.use(upload.array()); // for parsing multipart/form-data
app.use(express.static("./server/public"));

app.get("/sign_in", function (req, res) {
  res.render("sign_in");
});
app.get("/sign_up", function (req, res) {
  res.render("sign_up");
});
app.get("/home_page", function (req, res) {
  if (req.session.user) {
    res.render("home_page", { user: req.session.user.username });
  } else {
    res.redirect("sign_in");
  }
});
app.get("/logout", function (req, res) {
  req.session.destroy(function () {
    console.log("user logged out.");
  });
  res.redirect("/sign_in");
});
app.post("/sign_in", (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.redirect("sign_in", {
      message: "enter your username and password",
    });
  } else {
    console.log("Sign in");
    DB.connectDB()
      .then((con) => {
        console.log("Connected");
        user.login(req, res, next, con);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }
});
app.post("/sign_up", (req, res, next) => {
  console.log("Sign up");
  if (
    !req.body.username ||
    !req.body.password ||
    !req.body.name ||
    !req.body.dob ||
    !req.body.address ||
    !req.body.phoneNum ||
    !req.body.position
  ) {
    res.render("sign_up", {
      message: "lack of information",
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      address: req.body.address,
      phoneNum: req.body.phoneNum,
      position: req.body.position,
    });
  } else {
    DB.connectDB()
      .then((con) => {
        console.log("Connected");
        user.signup(req, res, next, con);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }
});
app.listen(3000, () => {
  console.log("http://localhost:3000");
});
