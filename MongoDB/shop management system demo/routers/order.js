const express = require("express");
const {
    Order,
    validateOrder
} = require("../models/order");


const router = express.Router();

router.post("/", async (req, res) => {
    const {
        error
    } = validateOrder(req.body);

    if (error) return res.status(400).send(error.details.map(e => e.message));

    const order = new Order(req.body);
    order.save();
    return res.status(200).send(req.body);
});

router.get("/", async (req, res) => {
    try {
        const orders = await Order.find().populate(
            "customer person product"

        );

        return res.status(200).send(orders);
    } catch (err) {
        res.status(404).send(err);
    }
});

module.exports = router;