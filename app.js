var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

var app = express();
const adapter = new FileSync("data/db.json");
const db = low(adapter);

db.defaults({
  id: [],
  name: [],
  heading: [],
  PosX: [],
  PosY: [],
}).write();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
