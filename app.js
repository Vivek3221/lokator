const express = require("express");
const path = require("path");
require("dotenv").config();
const db = require("./utils/connection");
const cors = require("cors");
const app = express();
//app.use(express.static(path.join(__dirname, "./frontend/build")));
app.use("/public/files", express.static("public/files"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("hello");
});
// Database sync
// db.sequelize.sync().then(() => {
//    console.log('Drop and Resync with { force: true }');
//  });
// app use bodyParser not needed if i used express version >=v4.16
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
//app.use(cookieParser());
app.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).send("Something broke!");
});

let userRouter = require("./routes/user");
let countryRouter = require("./routes/country");
let machineRouter = require("./routes/machine");
let productRouter = require("./routes/products");
app.use("/api/user", userRouter);
app.use("/api/country", countryRouter);
app.use("/api/machine", machineRouter);
app.use("/api/product", productRouter);
// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
//   //file path added
// });

app.use((req, res, next) => {
  //res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
  );
  const error = new Error("Route Not Found");
  error.status = 404;
  console.log(error);
  next(error);
});

// * Application-Level Middleware * //
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    error: error.status,
    message: error.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listing on port ${PORT}`);
});
module.exports = app;
