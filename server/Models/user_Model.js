// This list if for global users.
// This collection is used for login and verification of the users.
const mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Phone: {
    type: Number,
    required: true,
  },
});
mongoose.model("UserInfo", userSchema);
module.exports = mongoose.model("UserInfo");
// Now Creating Table in MongoDB Compass
