// express
var express = require("express");
var app = express();

// multer
var multer = require("multer");
var upload = multer();
//form-urlencoded
app.use(upload.array()); // for parsing multipart/form-data

// body parser
var bodyParser = require("body-parser");
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/xwww-

// cookie parser
var cookieParser = require("cookie-parser");
app.use(cookieParser());
var session = require("express-session");
// bcrypt
var bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

// User control
const UserController = require("./controllers/userController");
var user = UserController;

// Database
const DB = require("./database");
const { userRouter } = require("./routes/userRouter");

// pug
app.set("view engine", "pug"); // pug to html
app.set("views", "./server/views");

// middleware
app.use(session({ secret: "Shh, its a secret!" }));
app.use(express.static("./server/public"));

app.use("/", userRouter);
app.listen(3000, () => {
  console.log("http://localhost:3000");
});
