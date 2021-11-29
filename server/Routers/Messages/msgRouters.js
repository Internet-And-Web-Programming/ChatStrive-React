// This will be used to load all the users that are connected to a particular user
// It will also be used to get all the messages that are sent to a particular user

const express = require("express");
const router = express.Router();
// Creating a message table in mongoose schema
const Message = require("../../Models/msg_Model");

// saving the messages inside the database.
router.post("/send", async (req, res) => {
  const newMessage = new Message({
    User: {
      id: req.body.id,
      userConnections: [
        {
          PersonX: {
            id: req.body.userConnections[0].PersonX.id,
            sharedKey: req.body.userConnections[0].PersonX.sharedKey,
            ListofMsgs: [
              {
                msg: req.body.userConnections.PersonX.ListofMsgs[0].msg,
                sender: req.body.userConnections.PersonX.ListofMsgs[0].sender,
                receiver:
                  req.body.userConnections.PersonX.ListofMsgs[0].receiver,
                time: req.body.userConnections.PersonX.ListofMsgs[0].time,
              },
            ],
          },
        },
      ],
    },
  });
  try {
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Getting all the messages of a particular user
router.post("/user", async (req, res) => {
  // req = { id: "id", personX_ID: "personXID"}
  try {
    const messages = await Message.find({
      "User.id": req.params.id,
      "User.userConnections.PersonX.id": req.query.personX_ID,
    });
    res.send(messages);
  } catch (err) {
    res.status(500).send(err);
  }
});

// // Sending a new message to a particular user
// router.post("/:id", async (req, res) => {
//   const message = new Message({
//     senderID: req.body.sender.id,
//     receiverID: req.body.receiver.id,
//     msg: req.body.message,
//     time: req.body.time,
//   });
//   try {
//     const savedMessage = Message.conversations.push(message);
//     res.status(201).json(savedMessage);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });
// // These will not be needed right now, but could be handy in future use.
// // Updating a particular message
// router.patch("/:id", (req, res) => {});
// // Deleting a particular message
// router.delete("/:id", (req, res) => {});

// async function loadMsgs(sender, reciever) {
//   try {
//     const messages = await Message.find();
//     return messages;
//   } catch (err) {
//     return { message: err.message };
//   }
// }

module.exports = router;
