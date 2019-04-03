const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Person" 
  },

  starting_date: {
    type: String,
    maxlength: 11,
    minlength: 10,
    required: true
  },
    total_buy: {
    type: String,
    
    minlength: 1,
    required: true
  },
 
  
//   name:{
//       type: String,
//       maxlength:255,
//       minlength:3,
//       required: true
//   }

 
});
const Customer = mongoose.model("Customer",customerSchema);

function validateCustomer(customer) {
    const schema = {
        person: Joi.string(),
        starting_date: Joi.string()
        .max(11)
        .min(10)
        .required(),
        total_buy: Joi.string()
        
        .min(1)
        .required()
       
    };
  
    return Joi.validate(customer, schema);
  }
  
  module.exports = { Customer, validateCustomer };
  

