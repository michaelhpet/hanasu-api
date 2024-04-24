const { success, getPagination, AppError } = require("../../lib/utils");
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
   * get all user articles
   * @param {import("express").Request} req Request object
   * @param {import("express").Response} res Response object
   * @param {import("express").NextFunction} next Next function
   */
  async getUserArticles(req, res, next) {
    try {
      const articles = await articleService.getArticles(req.query, req.user);
      const totalCount = await articleService.getCount(req.user);
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
      if (article.author._id !== req.user._id && article.state === "draft")
        throw new AppError(401, "Article is not published");
      article.read_count += 1;
      await article.save();
      res.json(success({ article }, "Article fetched successfully"));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Publish article
   * @param {import("express").Request} req Request object
   * @param {import("express").Response} res Response object
   * @param {import("express").NextFunction} next Next function
   */
  async publishArticle(req, res, next) {
    try {
      const article = await articleService.getArticle(req.params.id);
      if (article.author._id !== req.user._id)
        throw new AppError(403, "User not authorized to update this article");
      if (article.state === "published")
        throw new AppError(400, "This article has already been published");
      article.state = "published";
      await article.save();
      res.json(success({ article }, "Article published successfully"));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Draft article
   * @param {import("express").Request} req Request object
   * @param {import("express").Response} res Response object
   * @param {import("express").NextFunction} next Next function
   */
  async draftArticle(req, res, next) {
    try {
      const article = await articleService.getArticle(req.params.id);
      if (article.author._id !== req.user._id)
        throw new AppError(403, "User not authorized to update this article");
      if (article.state === "draft")
        throw new AppError(400, "This article is already in draft");
      article.state = "draft";
      await article.save();
      res.json(success({ article }, "Article added to draft successfully"));
    } catch (error) {
      next(error);
    }
  }
}

const articleController = new ArticleController();
module.exports = articleController;
