const mongoose = require("mongoose");
const Joi = require("joi");

const catagorySchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 255,
    minlength: 3,
    required: true
  },
  description: {
    type: String,
    maxlength: 255,
    minlength: 3,
    required: true
  }
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 255,
    minlength: 3,
    required: true
  },
  catagory: {
    type: catagorySchema,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier"
  }
});

const Product = mongoose.model("Product", productSchema);

function validateProduct(product) {
  const schema = {
    name: Joi.string()
      .max(255)
      .min(3)
      .required(),
    catagory: Joi.object().keys({
      name: Joi.string()
        .min(4)
        .max(255),
      description: Joi.string()
        .min(5)
        .max(500)
    }),
    price: Joi.number().required(),
    supplier: Joi.string()
  };

  return Joi.validate(product, schema, { abortEarly: false });
}

module.exports = { Product, validateProduct };
