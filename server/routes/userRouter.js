const express = require("express");
const UserController = require("../controllers/user/userController");
const userRouter = express();
userRouter.post("/signup", UserController.signup);
userRouter.post("/signin", UserController.signin);
module.exports = { userRouter };
