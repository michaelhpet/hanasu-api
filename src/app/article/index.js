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

articleRouter.get(
  "/",
  articleValidator.getArticles,
  articleController.getArticles
);

articleRouter.get(
  "/:id",
  articleValidator.getArticle,
  articleController.getArticle
);

module.exports = articleRouter;
