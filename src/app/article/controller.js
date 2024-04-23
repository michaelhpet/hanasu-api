const { success, getPagination } = require("../../lib/utils");
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
      const article = await articleService.createArticle(req.body, req.user);
      res.json(success({ article }, "Article created successfully"));
    } catch (error) {
      next(error);
    }
  }

  /**
   * get all articles
   * @param {import("express").Request} req Request object
   * @param {import("express").Response} res Response object
   * @param {import("express").NextFunction} next Next function
   */
  async getArticles(req, res, next) {
    try {
      const articles = await articleService.getArticles(req.query);
      const totalCount = await articleService.getCount();
      const pagination = getPagination(req.query, articles.length, totalCount);
      res.json(
        success({ articles, pagination }, "Articles fetched successfully")
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get a single article
   * @param {import("express").Request} req Request object
   * @param {import("express").Response} res Response object
   * @param {import("express").NextFunction} next Next function
   */
  async getArticle(req, res, next) {
    try {
      const article = await articleService.getArticle(req.params.id);
      article.read_count += 1;
      article.save();
      res.json(success({ article }, "Article fetched successfully"));
    } catch (error) {
      next(error);
    }
  }
}

const articleController = new ArticleController();
module.exports = articleController;
