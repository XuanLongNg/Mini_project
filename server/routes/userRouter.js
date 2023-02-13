const express = require("express");
const UserController = require("../controllers/userController");
const userRouter = express();
userRouter.post("/signup", UserController.signup);
userRouter.post("/signin", UserController.signin);
module.exports = { userRouter };
