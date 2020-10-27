const mongoose = require("mongoose");
const Issue = require("./Issue");
const License = require("./License");

const Repository = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
    maxlength: 60,
  },

  language: {
    type: String,
    maxlength: 30,
  },

  forks: {
    type: Number,
    default: 0,
  },

  stargazers_count: {
    type: Number,
    default: 0,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },

  licenseid: {
    type: String,
  },

  issues: [],
});

module.exports = mongoose.model("Repository", Repository);
