const express = require("express");
const authenticate = require("../../lib/middleware/auth");
const articleController = require("../article/controller");
const articleValidator = require("../article/validator");
const userRouter = express.Router();

userRouter.get(
  "/articles",
  authenticate,
  articleValidator.getArticles,
  articleController.getUserArticles
);

module.exports = userRouter;
