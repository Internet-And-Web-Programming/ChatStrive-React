// This will be used to load all the users that are connected to a particular user
// It will also be used to get all the messages that are sent to a particular user

const express = require("express");
const router = express.Router();
// Creating a message table in mongoose schema
const Message = require("../../Models/msg_Model");

// Getting all the messages of a particular user
router.get("/:id", async (req, res) => {
  try {
    const messages = await loadMsgs(req.params.id, req.user._id);
    res.send(messages);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Sending a new message to a particular user
router.post("/:id", async (req, res) => {
  const message = new Message({
    senderID: req.body.sender.id,
    receiverID: req.body.receiver.id,
    msg: req.body.message,
    time: req.body.time,
  });
  try {
    const savedMessage = Message.conversations.push(message);
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// These will not be needed right now, but could be handy in future use.
// Updating a particular message
router.patch("/:id", (req, res) => {});
// Deleting a particular message
router.delete("/:id", (req, res) => {});

async function loadMsgs(sender, reciever) {
  try {
    const messages = await Message.find();
    return messages;
  } catch (err) {}
}

module.exports = router;
