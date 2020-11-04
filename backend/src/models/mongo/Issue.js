const mongoose = require("mongoose");

const Issue = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },

  body: {
    type: String,
    required: true,
  },

  created_at: {
    type: Date,
  },
});

module.exports = mongoose.model("Issue", Issue);
