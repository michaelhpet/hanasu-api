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
};

module.exports = articleValidator;
