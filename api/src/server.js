const app = require('./app');
const mongoOptions = require('../config/mongo');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, mongoOptions,(error)=>{
  if(!error) {
      console.log('Database sucefully connected.');
  } else {
      console.log(error);
      exit(1);
  }
});

var server = app.listen(8080);
