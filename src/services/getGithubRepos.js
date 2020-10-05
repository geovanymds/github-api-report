const axios = require('axios');
const Repository = require('../models/pg/Repository');
const config = require('../../config/axios');
const BASE_URL = 'https://api.github.com';

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
        type,
      };

      return formatedUser;

    });

    // Getting each user information
    users = await Promise.all(users.map(async (user,index) => {

      const { data } = await axios.get(user.url, config);
      const { login, url, type } = user;
      const id = index + 1;
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
  
      const {id, login, name, type, location, followers, public_repos} = user;
      dbUser = await User.create({id, login, name, type, location, followers, public_repos});

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

