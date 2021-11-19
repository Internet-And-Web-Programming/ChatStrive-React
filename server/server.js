require("./Models/db");

var express = require("express");
var path = require("path");
const exphbs = require("express-handlebars");
var app = express();

app.set("views", path.join(__dirname, "/views/"));
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + "/views/layouts/",
  })
);
const userCtrl = require("./Controllers/user");

app.listen(4500, () => {
  console.log("Server started at port : 4500");
});

app.use("/user", userCtrl);
