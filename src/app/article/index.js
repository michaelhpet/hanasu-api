const express = require("express");
const articleValidator = require("./validator");
const articleRouter = express.Router();

articleRouter.post("/", articleValidator.createArticle);

module.exports = articleRouter;
