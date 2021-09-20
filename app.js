var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var methodOverride = require("method-override");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var usersGamerRouter = require("./routes/users-game");
var usersBiodataRouter = require("./routes/users-biodata");
var usersHistoryRouter = require("./routes/users-history");
require("dotenv");
// var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var app = express();
var cors = require("cors");
const config = require("./config");

var dotenv = require("dotenv");
dotenv.config();
const rhs = process.env.SECRET || "rahasia";

app.use(cors());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("secretKey", config.secret);

app.use("/login", usersRouter);
app.use("/", indexRouter);

app.use(async (req, res, next) => {
  var token = await req.headers["authorization"];

  console.log(token);
  if (token) {
    try {
      const decoded = jwt.verify(token, rhs);
      req.data = decoded;
    } catch (error) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  } else {
    // return res.status(403).send({
    //   success: false,
    //   msg: "token tidak tersedia",
    // });
    res.render("error-page");
  }
});

app.use("/users-game", usersGamerRouter);
app.use("/users-biodata", usersBiodataRouter);
app.use("/users-history", usersHistoryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
