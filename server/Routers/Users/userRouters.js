// This file is for login and verification of the user
// That's why user_Model is used.
// All the CRUD operations in this file is just for login and sigining in.

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../../Models/user_Model");
// Adding the user inside user user schema
router.post("/", async (req, res) => {
  const newUser = new User({
    id: req.body.id,
    username: req.body.username,
    password: req.body.password,
    Name: req.body.name,
    Email: req.body.email,
    Phone: req.body.phone,
  });
  try {
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err });
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
module.exports = router;
