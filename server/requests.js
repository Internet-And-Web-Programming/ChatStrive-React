const express = require("express");
const router = express.Router();

class Route {
  constructor(path, method, callback) {
    this.path = path;
    this.method = method;
    this.callback = callback;
    this.router = router;
  }
  get(path, req, res, next) {
    this.router.get(path, function (req, res, next) {});
  }
}

module.exports = Route;
