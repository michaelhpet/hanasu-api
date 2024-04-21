const express = require("express");
const authController = require("./controller");
const authValidator = require("./validator");
const authRouter = express.Router();

authRouter.post("/signup", authValidator.signup, authController.signup);
authRouter.post("/login", authValidator.login, authController.login);

module.exports = authRouter;
