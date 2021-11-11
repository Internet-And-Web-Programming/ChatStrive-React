// import { Connect } from "./Database";

const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const app = express();
const AES = require("crypto-js/aes");

app.get("/", (req, res) => {
  res.send("Hello world");
});
const users = [{}];
const port = 4500 || process.env.PORT;
const server = http.createServer(app);
const io = socketIO(server);
app.use(cors());

io.on("connection", (socket) => {
  console.log("New user connected");
  socket.on("join", (data) => {
    users[socket.id] = data;
    console.clear();
    console.log(users);
  });
  socket.on("sendMessage", (data) => {
    console.log(data);
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
