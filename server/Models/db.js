var http = require("http");
var url = require("url");
var strdec = require("string_decoder").StringDecoder;
var mysql = require("mysql");
var cryptojs = require("crypto-js");
var bcrypt = require("bcrypt-nodejs");
var SHA1 = require("crypto-js/sha1");
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
      data.Name +
      "', '" +
      data.Username +
      "', '" +
      data.Password +
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
  // Checking Logging in.
  async sign_in(User) {
    let fquery =
      "select * from Users where Username = '" +
      User.Username +
      "' and Password = '" +
      User.Password +
      "'";
    const response = await this.con.query(fquery, function (err, result) {
      let ans = [];
      if (err) {
        console.log(err);
      } else {
        if (result.length > 0) {
          ans.push({
            Condition: "success",
          });
          console.log("User Found");
          ans.push(result[0]);
          console.log(result[0]);
        } else {
          ans.push({
            Condition: "failure",
          });
        }
      }
      return ans;
    });
    return response;
  }
  fetch_message(currUser, targetUser) {
    // query where either currUser is sender and targetUser is receiver or vice versa
    let response = [];
    let fquery =
      "select * from Messages where (Sender = '" +
      currUser +
      "' and Receiver = '" +
      targetUser +
      "') or (Sender = '" +
      targetUser +
      "' and Receiver = '" +
      currUser +
      "')";
    this.con.query(fquery, function (err, result) {
      if (err) throw err;
      if (!result) {
        response = [
          {
            Condition: "empty",
          },
        ];
      } else {
        response.push({
          Condition: "notempty",
        });
        for (let i = 0; i < result.length; i++) {
          response.push(result[i]);
        }
      }
      return response;
    });
  }
  new_message(currUser, targetUser, Msg) {
    // First getting the currUserID and targetUserID
    let currUserID = "";
    let targetUserID = "";
    let fquery =
      "select UserID from Users where Username ='" + currUser.username + "'";
    this.con.query(fquery, (err, result) => {
      if (err) throw err;
      if (!result) {
        console.log("User not found");
      } else {
        currUserID = result[0].UserID;
      }
    });
    fquery =
      "select UserID from Users where Username ='" + targetUser.username + "'";
    this.con.query(fquery, (err, result) => {
      if (err) throw err;
      if (!result) {
        console.log("User not found");
      } else {
        targetUserID = result[0].UserID;
      }
    });
    if (currUserID == "" || targetUserID == "") {
      console.log(
        "Not able to find who are you or to whom you are talking to."
      );
      return null;
    } else {
      let query =
        "insert into Messages (SenderID, ReceiverID, Message) values ('" +
        currUserID +
        "','" +
        targetUserID +
        "','" +
        Msg +
        "')";
      this.con.query(query, (err, result) => {
        if (err) {
          console.log(
            "Message is not regestered in the server because of the following reasons.\n",
            err
          );
        }
        console.log("Message Registered inside the database.");
      });
    }
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
};
