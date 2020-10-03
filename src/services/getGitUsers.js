const axios = require("axios");
const User = require('../models/pg/User');
const config = require("../../config/axios");
const userController = require('../controllers/user');
const USERS_URL = "https://api.github.com/users";

exports.getGitUsers = async (req, res, next) => {

  try {
    
    const response = [];

    // Get users base information
    for (var page = 0; page < 5; page++) {
      const { data } = await axios.get(
        `${USERS_URL}?since=${page * 135}&per_page=135`,
        config
      );

      response.push(...data);
    }

    // Formating information
    var users = response.map((user) => {

      const { login, url, type } = user;

      const formatedUser = {
        login,
        url,
        user_type: type,
      };

      return formatedUser;

    });

    // Getting each user information
    users = await Promise.all(users.map(async (user,index) => {

      const { data } = await axios.get(user.url, config);
      const { login, url, user_type } = user;
      const id = index + 1;
      const newUser = {
        id,
        login,
        url, 
        user_type: user_type[0].toLowerCase(),
        username: data.name,
        user_location: data.location,
        qnt_followers: data.followers,
        qnt_repositories: data.public_repos
      }

      return(newUser);

    }));

    //Storing users on the database
    users = await Promise.all(users.map(async (user) => {
  
      const {id, login, username, user_type, user_location, qnt_followers, qnt_repositories} = user;
      dbUser = await User.create({id, login, username, user_type, user_location, qnt_followers, qnt_repositories});

      return dbUser;

    }));

    return res.status(200).json({ Message: "Sucess", users: users });

  } catch (error) {
    next(error);
  }
};

