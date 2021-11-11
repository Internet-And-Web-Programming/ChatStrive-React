const mongoDB = require("mongodb");
const mongoClient = mongoDB.MongoClient;
const url = "mongodb://localhost:27017/";

function Connect(callback) {
  mongoClient.connect(url, function (err, db) {
    if (err) {
      console.log("Error connecting to MongoDB: " + err);
    } else {
      console.log("Connected to MongoDB!");
      callback(db);
    }
  });
}

export default {
  Connect,
};
