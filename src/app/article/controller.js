const { success } = require("../../lib/utils");
const articleService = require("./service");

class ArticleController {
  /**
   * Create a new article
   * @param {import("express").Request} req Request object
   * @param {import("express").Response} res Response object
   * @param {import("express").NextFunction} next Next function
   */
  async createArticle(req, res, next) {
    try {
      const article = await articleService(req.body, req.user);
      res.json(success({ article }, "Article created successfully"));
    } catch (error) {
      next(error);
    }
  }
}

const articleController = new ArticleController();
module.exports = articleController;
