var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const db = require("./config/database");

var productsRouter = require("./controller/index");
const userRoutes = require("./controller/index");
var cors = require("cors");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use((req, res, error, next) => {
  res.header("Access-control-Allow-Origin", "*"); //giving access
  res.header(
    "Access-COntrol-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  //browser send options request
  if (req.method === "OPTIONS") {
    res.header("Access-control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/product", productsRouter);
app.use("/users", userRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// catch 404 and forward to error handler

app.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

db();

module.exports = app;
