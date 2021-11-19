require("dotenv").config({
  path: "./.env",
});

const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
  },
  (error) => {
    if (!error) {
      console.log("Connected to MongoDB");
    } else {
      console.log("Error in connecting to MongoDB Here is the error :\n");
    }
  }
);

require("./user_Model");
