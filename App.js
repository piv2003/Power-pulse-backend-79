const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const loginRouter = require("./routes/auth");
const productsRouter = require("./routes/products");
const exercisesRouter = require("./routes/exercises");
const diaryRouter = require("./routes/diary");
const statisticsRouter = require("./routes/statistics");

const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", loginRouter);
app.use("/api/products", productsRouter);
app.use("/api/exercises", exercisesRouter);
app.use("/api/diary", diaryRouter);
app.use("/api/statistics", statisticsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  // console.log(err)
  res.status(err.code).json({
    message: err.message || "",
    status: err.status,
    code: err.code,
  });
});

module.exports = app;
