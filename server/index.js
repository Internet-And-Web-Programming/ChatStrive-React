// import { Connect } from "./Database";
// Comments that are ending with '...' are comments related to users.
// Comments that are ending with '//' are comments related to messages.
const http = require("http");
const express = require("express");
const cors = require("cors");
const io = require("socket.io")(4500, {
  cors: {
    origin: "http://localhost:3000",
  },
});
console.log("Socket is running on port 4500");
const app = express();
var Database = require("./Models/db");

// const AES = require("crypto-js/aes");
let db = new Database();
app.get("/", (req, res) => {
  res.send("Yes, we are listening at this port");
});
const users = [{}];
const port = 4500;
const server = http.createServer(app);

io.on("connection", (socket) => {
  console.log("New User Detected!!");
  // Creating a new user and storing in the database... *****Working well*****
  socket.on("NewRegister", (UserDetails) => {
    console.log(UserDetails);
    let result = db.sign_up(UserDetails);
    console.log("Result is...", result);
  });
  // when the user is entering the chat room than what things should happen...
  socket.on("login", (User) => {
    console.log(User);
    let userLoading = db.sign_in(User);
    console.log("UserLoading is... \n", userLoading);
    socket.emit("UsersLoading", userLoading);
    socket.on("Cookies", (Cookies) => {
      console.log("Cookies are...", Cookies);
    });
  });
  socket.on("Check_&_Add", (data) => {
    let [currUserID, targetUsername] = data;
    console.log("CheckUser is...", targetUsername);
    let user = db.check_user(targetUsername);
    console.log("User is... :", user);
    if (user !== undefined && user.UserID !== currUserID) {
      TargetUserID = user.UserID;
      let result = db.add_user(currUserID, TargetUserID);
      socket.emit("Check_&_Add", user);
    } else {
      socket.emit("Check_&_Add", null);
    }
  });

  //  When the user is selected then then we have to fetch all the messages from that user.
  socket.on("loadUsers", (UserID) => {
    console.log("UserID is...", UserID);
    let result = db.load_users(UserID);
    console.log("Result is...", result);
    socket.emit("loadUsers", result);
  });
  // When the user is typing a new message.
  socket.on("newMsg", (Msg) => {
    // db.new_message(currUser, targetUser, Msg);
    console.log("New message is...\n", Msg);
  });
  // Constantly checking the new messages of a particular user.
  async function checkNewMsg(currUser) {
    let newMsg = await db.fetch_message(currUser); //Dobut in this particular function.
    if (newMsg) {
      socket.emit("newMsg", newMsg);
    }
  }
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

/*
fuser -k 4500/tcp 
clear 
npm start

*/
