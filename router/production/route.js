const fs = require("fs");
const express = require("express");
const router = express.Router();
const contriesData = fs.readFileSync(
  __dirname + "/../../data/contries.json",
  "utf-8"
);
const optionsData = fs.readFileSync(
  __dirname + "/../../data/options.json",
  "utf-8"
);

router.get("/products", (req, res) => {
  res.status(200).json(JSON.parse(contriesData));
});

router.get("/options", (req, res) => {
  res.status(200).json(JSON.parse(optionsData));
});

router.post("/order", (req, res) => {
  try {
    const orderNumber = Math.floor(Math.random() * 1000000);
    const price = req.body.orderDatas.totals.total;
    res.status(201).json({ orderNumber, price });
  } catch (error) {
    return next({ status: 400, message: "invalid data type" });
  }
});

module.exports = router;
