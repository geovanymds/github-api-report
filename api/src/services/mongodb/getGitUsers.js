const axios = require("axios");
const User = require('../../models/mongo/User');
const config = require("../../../config/axios");
const USERS_URL = "https://api.github.com/users";

exports.getGitUsers = async (req, res, next) => {

  const { begin, end } = req.body;

  try {
    
    const response = [];

    // Get users base information
    for (var page = begin; page <= end; page++) {
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
    users = await Promise.all(users.map(async (user) => {

      const { data } = await axios.get(user.url, config);
      const { login, url, type } = user;
      const newUser = {
        login,
        url, 
        type: type[0].toLowerCase(),
        name: data.name,
        location: data.location,
        followers: data.followers,
      }

      return(newUser);

    }));

    users = users.map((user)=>{

      const newUser = user;
      if(!!user.login&&user.login.length<=39) newUser.login = user.login;
      if(!!user.name&&user.name.length<=63) newUser.name = user.name;
      if(!!user.location&&user.location.length<=100) newUser.location = user.location;
      newUser.public_repos = [];
      newUser.subscriptions = [];

      return newUser
    });

    //Storing users on the database
    users = await User.create(users);

    if(!!users) {
    

      return res.status(200).json({ users });

    } else {

      const error = new Error('Não foi possível encontrar os dados.');
      error.statusCode = 500;
      throw error; 

    }  

  } catch (error) {
    next(error);
  }
};
