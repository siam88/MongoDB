const express = require("express");
const { Product, validateProduct } = require("../models/product");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateProduct(req.body);

  if (error) return res.status(400).send(error.details.map(e => e.message));

  const product = new Product(req.body);
  product.save();
  return res.status(200).send(req.body);
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate(
      "supplier",
      "name address -_id"
    );
    return res.status(200).send(products);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
