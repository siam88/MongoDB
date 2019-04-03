const mongoose = require("mongoose");
const Joi = require("joi");

const addressSchema = mongoose.Schema({
  country: {
    type: String,
    maxlength: 255,
    minlength: 3,
    required: true
  },
  state: {
    type: String,
    maxlength: 255,
    minlength: 3,
    required: true
  },
  house: {
    type: String,
    maxlength: 255,
    minlength: 3,
    required: true
  },
  road: {
    type: String,
    maxlength: 255,
    minlength: 3,
    required: true
  }
});

const personSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 255,
    minlength: 3,
    required: true
  },

  address: {
    type: addressSchema,
    require: true
  },

  phone: {
    type: String,

    required: true
  },
  email: {
    type: String,
    maxlength: 255,
    minlength: 12,
    required: true
  }
});

const Person = mongoose.model("Person", personSchema);
function validatePerson(person) {
  const schema = {
    name: Joi.string()
      .max(255)
      .min(3)
      .required(),
    address: Joi.object().keys({
      country: Joi.string()
        .min(4)
        .max(255),
      state: Joi.string()
        .min(5)
        .max(500),
      house: Joi.string()
        .min(5)
        .max(500),
      road: Joi.string()
        .min(5)
        .max(500)
    }),

    phone: Joi.string().required(),
    email: Joi.string()
      .max(255)
      .min(12)
      .required()
  };
  return Joi.validate(person, schema, { abortEarly: false });
}

module.exports = { Person, validatePerson };
