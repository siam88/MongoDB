const mongoose = require("mongoose");
const Joi = require("joi");

const orderProductListSchema = new mongoose.Schema({
  product: mongoose.Schema.Types.ObjectId,
  quantity: {
    type: Number,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  orderProductList: {
    type: orderProductListSchema,
    required: true
  },
  actualPrice: {
    type: String,
    minlength: 1,
    required: true
  },
  totalDiscount: {
    type: String,
    minlength: 1,
    required: true
  },
  orderPrice: {
    type: String,
    minlength: 1,
    required: true
  },
  date: {
    type: String,
    maxlength: 10,
    minlength: 10,
    required: true
  },
  isDelivered: {
    type: String,
    required: true
  },
  iscanceled: {
    type: String,
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer"
  }
});

const Order = mongoose.model("Order", orderSchema);

function validateOrder(order) {
  const schema = {
    orderProductList: Joi.object().keys({
      product: Joi.string(),
      quantity: Joi.number().required(),
    }),
    actualPrice: Joi.string().min(1).required(),
    totalDiscount: Joi.string().min(1).required(),
    orderPrice: Joi.string().min(1).required(),
    date: Joi.string().max(10).min(10).required(),
    isDelivered: Joi.string().required(),
    iscanceled: Joi.string().required(),
    customer: Joi.string()
  };

  return Joi.validate(order, schema, {
    abortEarly: false
  });
}
module.exports = {
  Order,
  validateOrder
};