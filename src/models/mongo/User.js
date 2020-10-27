const mongoose = require("mongoose");

const User = new mongoose.Schema({
  login: {
    type: String,
    unique: true,
    required: true,
    maxlength: 39,
  },

  name: {
    type: String,
    maxlength: 63,
  },

  followers: {
    type: Number,
  },

  type: {
    type: String,
    enum: ["o", "u"],
  },

  location: {
    type: String,
    maxlength: 100,
  },

  public_repos: [],

  subscriptions: [],
});

module.exports = mongoose.model("User", User);
