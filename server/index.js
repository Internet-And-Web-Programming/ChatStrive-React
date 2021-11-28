// import { Connect } from "./Database";
// Comments that are ending with '...' are comments related to users.
// Comments that are ending with '//' are comments related to messages.
const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
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
const io = socketIO(server);
app.use(cors());

io.on("connection", (socket) => {
  // Creating a new user and storing in the database... *****Working well*****
  socket.on("NewRegister", (UserDetails) => {
    console.log(UserDetails);
    db.sign_up(UserDetails);
  });
  // when the user is entering the chat room than what things should happen...
  socket.on("login", (User) => {
    console.log(User);
    let usersLoading = db.sign_in(User);
    console.log("UserLoading is... \n", usersLoading);
    socket.emit("UsersLoading", usersLoading);
  });

  //  When the user is selected then then we have to fetch all the messages from that user.
  socket.on("click", (currUser, targetUser) => {
    let loadMsgs = db.fetch_message(currUser, targetUser);
    if (!loadMsgs) {
      loadMsgs = { error: "Not able to fetch messages" };
    }
    socket.emit("messages", loadMsgs);
  });
  // When the user is typing a new message.
  socket.on("newMsg", (currUser, targetUser, Msg) => {
    db.new_message(currUser, targetUser, Msg);
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

server.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
