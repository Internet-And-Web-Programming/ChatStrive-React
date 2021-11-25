// import { Connect } from "./Database";

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
  socket.on("NewRegister", (UserDetails) => {
    console.log(UserDetails);
  });

  socket.on("register", (data) => {
    users[socket.id] = data;
    let User = {
      name: "Unkown",
      username: data[0],
      password: data[1],
    };
    db.sign_up(User);

    // console.log(users);
  });
  socket.on("open", (user) => {
    console.log("user ", user, "is detected!!");
    socket.on("send", (data) => {
      console.log("MessageData is:- ", data);
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
