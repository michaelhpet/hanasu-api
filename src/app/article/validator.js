const { celebrate, Joi } = require("celebrate");

const articleValidator = {
  createArticle: celebrate({
    body: Joi.object().keys({
      title: Joi.string().required(),
      body: Joi.string().required(),
      description: Joi.string(),
      tags: Joi.array().items(Joi.string()),
    }),
  }),
  getArticles: celebrate({
    query: Joi.object().keys({
      page: Joi.number(),
      limit: Joi.number(),
      search: Joi.string(),
    }),
  }),
  getArticle: celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().length(24).required(),
    }),
  }),
};

module.exports = articleValidator;
