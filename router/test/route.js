const fs = require("fs");
const express = require("express");
const router = express.Router();
const testData = fs.readFileSync(__dirname + "/../../data/test.json", "utf-8");

router.get("/products", (req, res) => {
  res.status(200).json(JSON.parse(testData));
});

router.get("/options", (req, res) => {
  res.status(200).json(JSON.parse(testData));
});

router.post("/order", (req, res, next) => {
  try {
    const price = req.body.orderDatas.totals.total;
    res.status(201).json({ orderNumber: 123456, price });
  } catch (error) {
    return next({ status: 400, message: "invalid data type" });
  }
});

module.exports = router;
