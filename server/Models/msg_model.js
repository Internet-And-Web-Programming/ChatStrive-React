const mongoose = require("mongoose");
var msgSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  senderID: {
    type: String,
    required: true,
    unique: true,
  },
  recieverID: {
    type: String,
    required: true,
  },
  msgTime: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    required: true,
  },
});
mongoose.model("UserData", msgSchema);
