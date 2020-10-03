const User = require('../models/pg/User');

exports.create = async(user) => {

  const {id, login, username, user_type, user_location, qnt_followers, qnt_repositories} = user;

  try {

    dbUser = await User.create({id, login, username, user_type, user_location, qnt_followers, qnt_repositories});

    return dbUser;

  } catch (err) {

    const error = new Error(err);
    error.statusCode = 401;
    throw error; 

  }

}