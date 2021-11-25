var http = require("http");
var url = require("url");
var strdec = require("string_decoder").StringDecoder;
var mysql = require("mysql");
var cryptojs = require("crypto-js");
var bcrypt = require("bcrypt-nodejs");
var time = require("time");
module.exports = class Database {
  constructor() {
    this.con = mysql.createConnection({
      host: "localhost",
      user: "tanmay",
      password: "tanmayDB",
      database: "ChatStrive",
    });
    this.connected = false;
    this.con.connect(function (err) {
      if (err) {
        console.log("Error connecting to Db");
        this.connected = false;
      } else {
        console.log("Connected to Database");
        this.connected = true;
      }
    });
  }
  // Adding the new user in the database.
  sign_up(data) {
    const generate = (data) => {
      let userID = bcrypt.hashSync(data.username);
      return userID;
    };
    let userID = generate(data);
    let fquery =
      "insert into Users (UserID, Name, Username, Password) " +
      "values ('" +
      userID +
      "', '" +
      data.name +
      "', '" +
      data.username +
      "', '" +
      data.password +
      "' )";
    console.log(fquery);
    this.con.query(fquery, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("New Insertion : " + data);
        console.log("New User Added");
      }
    });
  }
  fetch_message(req) {
    let decoder = new strdec("utf-8");
    let buffer = "";
    req.on("data", function (chunk) {
      buffer += decoder.write(chunk);
    });
    req.on("end", function () {
      buffer += decoder.end();
      var queryobj = JSON.parse(buffer);
      let fquery =
        "select * from Messages where (senderID = '" +
        queryobj.senderID +
        "'and recvID = '" +
        queryobj.recvID +
        "')";
      this.con.query(fquery, function (err, result) {
        if (err) throw err;
        // console.log("");
        res.writeHead(200, "OK", {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        });
        return JSON.stringify(result);
      });
    });
  }
  new_message(req) {
    let decoder = new strdec("utf-8");
    let buffer = "";
    req.on("data", function (chunk) {
      buffer += decoder.write(chunk);
    });
    req.on("end", function () {
      buffer += decoder.end();
      var messageobj = JSON.parse(buffer);
      let fquery =
        "insert into Messages values ('" +
        messageobj.senderID +
        "','" +
        messageobj.recvID +
        "','" +
        messageobj.message +
        "')";
      this.con.query(fquery, function (err, result) {
        if (err) throw err;
        // create_session()
        console.log(
          "New Message: " + messageobj.senderID + " to " + messageobj.recvID
        );
        res.writeHead(200, "OK", {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        });
        return buffer;
      });
    });
  }
  sign_in(req, res) {
    let decoder = new strdec("utf-8");
    let buffer = "";
    req.on("data", function (chunk) {
      buffer += decoder.write(chunk);
    });
    req.on("end", function () {
      buffer += decoder.end();
      var userobj = JSON.parse(buffer);
      let fquery =
        "select * from Users where (UserID = '" + userobj.UserID + "')";
      this.con.query(fquery, function (err, result) {
        if (err) throw err;
        if (!result) {
          res.writeHead(401, "UNAUTHORIZED", {
            "Access-Control-Allow-Origin": "*",
          });
          res.end();
        }
        res.writeHead(200, "OK", {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        });
        console.log("Found User");
        let token = { UserID: result[0].UserID };
        let enctoken = cryptojs.AES.encrypt(
          JSON.stringify(token),
          "secretkey123"
        ).toString();
        res.write(enctoken);
        res.end();
      });
    });
  }
  // create session endpoint to be hit, whenever message sent (or user searched -- optional) -- see ./messages.py
  // basically creates a log of who sent to who without duplication
  // 'Sessions' table is used in fetch_contacts
  create_session(req, res) {
    let decoder = new strdec("utf-8");
    let buffer = "";
    req.on("data", function (chunk) {
      buffer += decoder.write(chunk);
    });
    req.on("end", function () {
      buffer += decoder.end();
      userobj = JSON.parse(buffer);
      let fquery =
        "insert into Sessions(User1ID , User2ID, SessionID)'" +
        "VALUES( '" +
        userobj.User1 +
        "','" +
        userobj.User2 +
        "','" +
        cryptojs.SHA256(userobj.User1 + userobj.User2 + time.now()).toString() +
        "')";
      this.con.query(fquery, function (err, result) {
        if (err) {
          if (err.code == "ER_DUP_ENTRY") {
            console.log(
              "Session: " +
                userobj.User1 +
                " to " +
                userobj.User2 +
                " already recorded, skipping...\n"
            );
            res.writeHead(502, "BAD GATEWAY", {
              "Access-Control-Allow-Origin": "*",
            });
            res.end();
          } else throw err;
        } else {
          console.log(buffer);
          console.log("This is the result: ", result);
          console.log(
            "Session: " +
              userobj.User1 +
              " to " +
              userobj.User2 +
              " added into record\n"
          );
          res.writeHead(200, "OK", {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          });
          res.write(JSON.stringify(buffer));
          res.end();
          // move console log here (last message issue)
        }
      });
    });
  }
  fetch_contacts(UserID) {
    let query =
      "Select connections from Connections WHERE UserID = '" + UserID + "';";
    this.con.query(query, function (err, result) {
      if (err) {
        console.log(err);
      }
      let users = result[0].connections.split(",");
      let ans = "";
      for (let i = 0; i < users.length; i++) {
        let query = "Select * from Users WHERE UserID = '" + users[i] + "';";
        this.con.query(query, function (err, result) {
          if (err) {
            console.log(err);
          }
          ans += JSON.stringify(result[0]) + ",";
        });
      }
      ans = ans.substring(0, ans.length - 1);
      console.log(ans);
      return ans;
    });
  }
};
