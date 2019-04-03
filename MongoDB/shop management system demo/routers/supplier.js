const express = require("express");
const { Supplier, validateSupplier } = require("../models/supplier");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateSupplier(req.body);

  if (error) return res.status(400).send(error.details.map(e => e.message));

  const supplier = new Supplier(req.body);
  supplier.save();
  return res.status(200).send(req.body);
});

router.get("/", async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    return res.status(200).send(suppliers);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
