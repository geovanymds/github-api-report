const mongoose = require('mongoose');

const Permission = new mongoose.Schema({

  name: {
        type: String,
        required: true,
        maxlength: 30
  }
  
});

module.exports = mongoose.model('Permission', Permission);