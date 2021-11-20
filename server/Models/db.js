require("dotenv").config({ path: __dirname + "../.env" });

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://ChatStrive:b8VEBQ07JkVqzjzM@cluster0.yi9rj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to MongoDB"));

require("./user_Model"); // for Login verification and Sigining
require("./msg_Model");
app.use(express.json());

const userRouter = require("../Routers/Users/userRouters");
app.use("/users", userRouter);
const msgRouter = require("../Routers/Messages/msgRouters");
app.use("/messages", msgRouter);

app.listen(4500, () => console.log("Server is running on port 4500"));
