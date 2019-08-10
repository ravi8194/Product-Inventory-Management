const Joi = require("@hapi/joi");

const productSchema = Joi.object().keys({
  product_name: Joi.string().required(),
  price: Joi.number().required(),
  rating: Joi.number().required()
});

module.exports = productSchema;
