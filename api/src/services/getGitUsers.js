const axios = require("axios");
const User = require('../models/pg/User');
const config = require("../../config/axios");
const USERS_URL = "https://api.github.com/users";

exports.getGitUsers = async (req, res, next) => {

  const {begin, end} = req.body;

  try {
    
    const response = [];

    // Get users base information
    for (var page = begin; end <= 9; page++) {
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
        type,
      };

      return formatedUser;

    });

    // Getting each user information
    users = await Promise.all(users.map(async (user,index) => {

      const { data } = await axios.get(user.url, config);
      const { login, url, type } = user;
      const id = 900 + index + 1;
      const newUser = {
        id,
        login,
        url, 
        type: type[0].toLowerCase(),
        name: data.name,
        location: data.location,
        followers: data.followers,
        public_repos: data.public_repos
      }

      return(newUser);

    }));

    //Storing users on the database
    users = await Promise.all(users.map(async (user) => {
  
      dbUser = await User.create(user);

      return dbUser;

    }));

    if(!!users) {

      return res.status(200).json({ Message: "Sucess"});

    } else {

      const error = new Error('Não foi possível encontrar os dados.');
      error.statusCode = 500;
      throw error; 

    }  

  } catch (error) {
    next(error);
  }
};

