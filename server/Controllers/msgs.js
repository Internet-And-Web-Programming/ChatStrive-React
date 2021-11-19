const usr = require("./user");
const express = require("express");
var router = express.Router();

router.post("/", (req, res) => {
  console.log("Inside msgs.js");
  console.log(req.body);
  res.send("Hello World");
});
