const mongoose = require("mongoose");
var msgSchema = new mongoose.Schema({
  User: {
    id: {
      type: String,
      required: true,
    },
    userConnections: [
      {
        PersonX: {
          id: {
            type: String,
            required: true,
          },
          sharedKey: {
            type: String,
            required: true,
          },
          ListofMsgs: [
            {
              msg: {
                type: String,
                required: true,
              },
              sender: {
                type: String,
                required: true,
              },
              receiver: {
                type: String,
                required: true,
              },
              time: {
                type: String,
                required: true,
              },
            },
          ],
        },
      },
    ],
  },
});

// Correct transformation of the complete Message Schema.
// Schema will hold the complete message schema of all the users.
mongoose.model("UserData", msgSchema);
