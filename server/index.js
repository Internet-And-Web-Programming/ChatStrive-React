const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const app = express();
app.get("/", (req, res) => {
  res.send("Hello world");
});

const port = 4500 || process.env.PORT;
const server = http.createServer(app);
const io = socketIO(server);
app.use(cors());

io.on("connection", (socket) => {
  console.log("New user connected");
  socket.on("join", (data) => {
    console.log(data);
  });
});

server.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
