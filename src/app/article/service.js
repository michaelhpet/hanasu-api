const { AppError, calculateReadTime } = require("../../lib/utils");
const Article = require("./model");

class ArticleService {
  async createArticle(payload, author) {
    if (await Article.findOne({ title: payload.title }))
      throw new AppError(400, "Article with this title already exists");
    return await Article.create({
      ...payload,
      reading_time: calculateReadTime(payload.body),
      author,
    });
  }

  async getArticles(payload, user = null) {
    const { page = 1, limit = 20, search, ...query } = payload;
    const offset = (page - 1) * limit;
    if (user) query["author._id"] = user._id;
    else query.state = "published";
    const articles = await Article.find({
      ...query,
      ...(search
        ? {
            $or: [
              { $text: { $search: search } },
              { tags: search },
              { "author.first_name": { $regex: new RegExp(search, "i") } },
              { "author.last_name": { $regex: new RegExp(search, "i") } },
            ],
          }
        : {}),
    })
      .skip(offset)
      .limit(limit);
    for (const article of articles) {
      await article.populate("author");
    }
    return articles;
  }

  async getArticle(id) {
    const article = await Article.findById(id);
    if (!article) throw new AppError(404, "Article could not be found");
    await article.populate("author");
    return article;
  }

  async getCount(user = null) {
    return await Article.countDocuments(user ? { author: user._id } : {});
  }

  async updateArticle(id, data) {
    return await Article.findByIdAndUpdate(id, data, { new: true });
  }
}

const articleService = new ArticleService();
module.exports = articleService;
