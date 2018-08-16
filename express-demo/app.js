const config = require("config");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./logger");
const courses = require("./routes/courses");
const home = require("./routes/home");

var app = express();
app.set("view engine", "pug");
app.set("views", "./views"); // default

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`APP: ${app.get("env")}`);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan Enabled");
}
app.use(helmet());

// Allow this middleware to allow us to read from the body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use((req, res, next) => {
  console.log("Logging...");
  next();
});

app.use(logger);

// Router
app.use("/", home);
app.use("/api/courses/", courses);

// Configuration
console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
console.log("Password: " + config.get("mail.password"));

// PORT in ~Enviroment Variable
const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`Server running on Port ${port}`);
});
