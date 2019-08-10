const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: { type: String, required: true }
});

module.exports = mongoose.model("newUser", userSchema);
