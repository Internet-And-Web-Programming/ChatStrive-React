const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });
