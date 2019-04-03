const express = require("express");
const mongoose = require("mongoose");
const products = require("./routers/product");
const suppliers = require("./routers/supplier");
const persons = require("./routers/person");
const customers = require("./routers/customer");
const orders = require("./routers/order");

const app = express();

mongoose
  .connect("mongodb://localhost/mongo-rel", {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("Connect With mongodb"))
  .catch(() => console.log("Can not connect"));

app.use(express.json());
app.use("/api/products", products);
app.use("/api/suppliers", suppliers);
app.use("/api/persons", persons);
app.use("/api/customers", customers);
app.use("/api/orders", orders)
app.listen(3000, () => console.log("listning port 3000"));