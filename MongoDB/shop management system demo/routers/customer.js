const express = require("express");
const { Customer, validateCustomer } = require("../models/customer");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);

  if (error) return res.status(400).send(error.details.map(e => e.message));

  const customer = new Customer(req.body);
  customer.save();
  return res.status(200).send(req.body);
});

router.get("/", async (req, res) => {
    try {
      const customers = await Customer.find().populate(
        "person",
        
      );
      return res.status(200).send(customers);
    } catch (err) {
      res.status(404).send(err);
    }
});

module.exports = router;