var http = require("http");
var url = require("url");
var strdec = require("string_decoder").StringDecoder;
const Mysql = require("sync-mysql");
var cryptojs = require("crypto-js");
var bcrypt = require("bcrypt-nodejs");
var SHA1 = require("crypto-js/sha1");
var time = require("time");
module.exports = class Database {
  constructor() {
    this.con = new Mysql({
      host: "localhost",
      user: "tanmay",
      password: "tanmayDB",
      database: "ChatStrive",
    });
    this.connected = false;
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
    let query = this.con.query(fquery);
    return query;
  }
  // Checking Logging in.
  sign_in(User) {
    let fquery =
      "SELECT * FROM Users WHERE Username = '" +
      User.Username +
      "' AND Password = '" +
      User.Password +
      "' ;";
    let response = [];
    let result = this.con.query(fquery);

    if (result.length === 0) {
      response.push({
        status: "NotFound",
      });
    } else {
      response.push({
        status: "Found",
      });
      response.push({
        UserID: result[0].UserID,
        Username: result[0].Username,
        Name: result[0].Name,
      });
    }
    return response;
  }
  check_user(username) {
    let query =
      "select UserID, Name ,Username from Users where Username = '" +
      username +
      "'";
    let results = this.con.query(query)[0];
    return results;
  }
  add_user(UserID1, UserID2) {
    let query1 =
      "SELECT connections FROM Connections WHERE UserID = '" + UserID1 + "'";
    let result1 = this.con.query(query1)[0];
    if (result1.connections === "") {
      result1.connections += UserID2;
    } else {
      let x = false;
      let IDs = result2.connections.split(",");
      for (let i = 0; i < IDs.length; i++) {
        if (IDs[i] === UserID2) {
          x = true;
          break;
        }
      }
      if (x === false) {
        result1.connections += ", " + UserID2;
      }
    }
    let newQuery1 =
      'UPDATE Connections SET connections = "' +
      result1.connections +
      '" WHERE UserID = "' +
      UserID1 +
      '"';
    let response1 = this.con.query(newQuery1);
    let query2 =
      "SELECT connections FROM Connections WHERE UserID = '" + UserID2 + "'";
    let result2 = this.con.query(query2)[0];
    if (result2.connections === "") {
      result2.connections += UserID1;
    } else {
      let x = false;
      let IDs = result2.connections.split(",");
      for (let i = 0; i < IDs.length; i++) {
        if (IDs[i] === UserID1) {
          x = true;
          break;
        }
      }
      if (x === false) {
        result2.connections += ", " + UserID1;
      }
    }
    let newQuery2 =
      'UPDATE Connections SET connections = "' +
      result2.connections +
      '" WHERE UserID = "' +
      UserID2 +
      '"';
    let response2 = this.con.query(newQuery2);
    let finalResponse = [response1, response2];
    console.log(finalResponse);
    return result1;
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
