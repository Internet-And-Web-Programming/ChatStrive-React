// import { Connect } from "./Database";
// Comments that are ending with '...' are comments related to users.
// Comments that are ending with '//' are comments related to messages.
const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const app = express();
const cryptojs = require('crypto-js');
var Database = require("./Models/db");
//For running jquery ajax the below modules
const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);

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
    // let resp = db.sign_up(UserDetails);
    // The http request
    $.ajax('http://127.0.0.1:8081/sign_up',{
      method : "POST",
      headers : {
        "Content-Type":"application/json"
      },
      data : JSON.stringify({
        "Username": UserDetails.Username,
        "Password": UserDetails.Password,
        "Name":UserDetails.Name
      }),
      success: function(resp,status){
        console.log("new Insertion : ")
        console.log(resp);
      }
    })
    // console.log("return of sign_up function " + resp);
  });
  // when the user is entering the chat room than what things should happen...
  socket.on("login", (User) => {
    console.log(User);
    // let usersLoading = db.sign_in(User);
    // console.log("UserLoading is... \n", usersLoading);
    // socket.emit("UsersLoading", usersLoading);
    $.ajax('http://127.0.0.1:8081/sign_in',{
      method : "POST",
      headers : {
        "Content-Type":"application/json"
      },
      data : JSON.stringify({
        "Username": User.Username,
        "Password": User.Password
      }),
      // success: function(resp,status){
      //   console.log("new sign in : ")
      //   socket.emit("UsersLoading",resp);
      //   //console.log(JSON.parse(resp));
      //   // let token = resp;
      //   // localStorage.setItem("onesignintoken",token);
      // },
      statusCode:{
        401 : function(){
          console.log("User Not Found");
        },
        200 : function(resp,status){
          console.log("Logged IN");
          console.log(resp.responseText);
          let enctoken = resp.responseText;
          let dectoken = cryptojs.AES.decrypt(enctoken,"secretkey123");
          let strtoken = dectoken.toString(cryptojs.enc.Utf8);
          let tokenobj = JSON.parse(strtoken);
          // let tokenobj = JSON.parse(strtoken);
          // console.log(JSON.parse(strtoken));
          socket.emit("Userloading",tokenobj);
        }
      }
    });
  });

  //  When the user is selected then then we have to fetch all the messages from that user.
  socket.on("click", (currUser, targetUser) => {
    // let loadMsgs = db.fetch_message(currUser, targetUser);
    // if (!loadMsgs) {
    //   loadMsgs = { error: "Not able to fetch messages" };
    // }
    // socket.emit("messages", loadMsgs);
    $.ajax('http://127.0.0.1:8081/fetch_message',{
      method : "POST",
      headers : {
        "Content-Type":"application/json"
      },
      data : JSON.stringify({
        "currUser": currUser.Username,
        "targetUser": targetUser.Username
      }),
      // success: function(resp,status){
      //   console.log("new sign in : ")
      //   socket.emit("UsersLoading",resp);
      //   //console.log(JSON.parse(resp));
      //   // let token = resp;
      //   // localStorage.setItem("onesignintoken",token);
      // },
      statusCode:{
        401 : function(){
          console.log("User Not Found");
        },
        200 : function(resp,status){
          console.log("message sent");
        }
      }
    });
  });
  // When the user is typing a new message.
  socket.on("newMsg", (currUser, targetUser, Msg) => {
    // db.new_message(currUser, targetUser, Msg);
    $.ajax('http://127.0.0.1:8081/new_message',{
      method : "POST",
      headers : {
        "Content-Type":"application/json"
      },
      data : JSON.stringify({
        "currUser": currUser.Username,
        "targetUser": targetUser.Username
      }),
      // success: function(resp,status){
      //   console.log("new sign in : ")
      //   socket.emit("UsersLoading",resp);
      //   //console.log(JSON.parse(resp));
      //   // let token = resp;
      //   // localStorage.setItem("onesignintoken",token);
      // },
      statusCode:{
        401 : function(){
          console.log("User Not Found");
        },
        200 : function(resp,status){
          console.log("message sent");
        }
      }
    });
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
