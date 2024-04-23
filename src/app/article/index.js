const express = require("express");
const articleValidator = require("./validator");
const authenticate = require("../../lib/middleware/auth");
const articleController = require("./controller");
const articleRouter = express.Router();

articleRouter.post(
  "/",
  authenticate,
  articleValidator.createArticle,
  articleController.createArticle
);

module.exports = articleRouter;
