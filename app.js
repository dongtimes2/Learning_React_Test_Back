const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const testRouter = require("./router/test/route");
const productionRouter = require("./router/production/route");
const devRouter = require("./router/dev/route");

app.set("port", 8000);
app.use(express.json());
app.use(express.static("public"));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/", (req, res) => {
  res.json({ message: "server status ok" });
});

if (process.env.NODE_ENV === "test") {
  app.use(testRouter);
} else if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
  app.use(devRouter);
} else if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(productionRouter);
}

app.use((req, res) => {
  res.status(404).json({ message: "not found" });
});

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({ message: err.message });
  } else {
    res.status(500).json({ message: "internal error" });
  }
});

module.exports = app;
