// This file is for login and verification of the user
// That's why user_Model is used.
// All the CRUD operations in this file is just for login and sigining in.

const express = require("express");
const router = express.Router();
const User = require("../../Models/user_Model");
// Adding the user inside user user schema *******CREATE*******
router.post("/", async (req, res) => {
  const newUser = new User({
    id: req.body.id,
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//  Getting the user details with it's id.
// function loadUser(id) {
router.get("/:id", async (req, res) => {
  try {
    const data = await User.find({
      id: req.params.id,
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// }

// Getting all the users from the database
router.get("/", async (req, res) => {
  try {
    const data = await User.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Deleting the user with it's id.
router.delete("/:id", async (req, res) => {
  try {
    const removedUser = await User.deleteOne({
      id: req.params.id,
    });
    res.json(removedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
