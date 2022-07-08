/* eslint-disable no-useless-escape */
const { celebrate, Joi } = require("celebrate");

const RegExp =
  /^https?:\/\/(www\.)?([-a-z0-9_])*\.([a-z0-9]){2,3}\/?([a-z0-9\-._~:\/?#[\]@!\$&'()*+,;=]?)*/;

// user request validations

module.exports.getUserByIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
});

module.exports.createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value, helpers) => {
      if (RegExp.test(value)) {
        return value;
      }
      return helpers.message("Некорректный формат ссылки");
    }),
    email: Joi.string().required(),
    password: Joi.string().required().min(6),
  }),
});

module.exports.updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

module.exports.updateUserAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom((value, helpers) => {
      if (RegExp.test(value)) {
        return value;
      }
      return helpers.message("Некорректный формат ссылки");
    }),
  }),
});

module.exports.loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().min(6),
  }),
});

// cards request validations

module.exports.createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (RegExp.test(value)) {
          return value;
        }
        return helpers.message("Некорректный формат ссылки");
      }),
  }),
});

module.exports.deleteCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
});

module.exports.likeCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
});

module.exports.dislikeCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
});
