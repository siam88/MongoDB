const mongoose = require("mongoose");
const Joi = require("joi");

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 255,
    minlength: 3,
    required: true
  },
  address: {
    type: String,
    maxlength: 255,
    minlength: 3,
    required: true
  }
});

const Supplier = mongoose.model("Supplier", supplierSchema);

function validateSupplier(supplier) {
  const schema = {
    name: Joi.string()
      .max(255)
      .min(3)
      .required(),
    address: Joi.string()
      .max(255)
      .min(3)
      .required()
  };

  return Joi.validate(supplier, schema, {
    abortEarly: false
  });
}

module.exports = {
  Supplier,
  validateSupplier
};