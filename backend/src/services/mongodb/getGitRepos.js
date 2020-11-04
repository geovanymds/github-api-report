const axios = require("axios");
const User = require("../../models/mongo/User");
const Repository = require("../../models/mongo/Repository");
const License = require('../../models/mongo/License');
const config = require("../../../config/axios");
const BASE_URL = "https://api.github.com";

exports.getGitRepos = async (req, res, next) => {

  const limite = 100;

  const {page} = req.body;
  
  try {

    const users = await User.find()
    .skip((page-1) * limite)
    .limit(limite);

    // Get repos information
    var response = await Promise.all(users.map(async (user)=>{

      const { data } = await axios.get(
        `${BASE_URL}/users/${user.login}/repos`,
        config
      );

      const formatedRepos = data.map((repo)=>{

        const formRepo = {
          full_name: repo.full_name,
          language: repo.language,
          forks: repo.forks_count,
          stargazers_count: repo.stargazers_count,
          created_at: repo.created_at,
          licenseid: !!repo.license ? repo.license.key : null
        }

        return formRepo;

      });

      return formatedRepos;

    }));

    let repos = [];

    response.forEach((userRepos)=>{
        repos.push(...userRepos);
    });

    repos = repos.filter((repo)=>{
      return(!!repo.full_name&&repo.full_name.length<=60);
    });

    const dbRepos = await Promise.all(repos.map(async(repo)=>{

      const dbRepo = await Repository.create(repo);
      const login =  repo.full_name.split('/')[0]
      const user = await User.findOne({login});
      user.public_repos.push(dbRepo);
      await user.save();
      return dbRepo;

    }));

    return res.status(200).json({ dbRepos });

  } catch (error) {

    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};


exports.getGitSubscriptions = async (req, res, next) => {

  const limite = 100;

  const {page} = req.body;
  
  try {

    const users = await User.find()
    .skip((page-1) * limite)
    .limit(limite);

    // Get repos information
    var response = await Promise.all(users.map(async (user)=>{

      const { data } = await axios.get(
        `${BASE_URL}/users/${user.login}/subscriptions`,
        config
      );

      const formatedRepos = data.map((repo)=>{

        const formRepo = {
          full_name: repo.full_name,
          language: repo.language,
          forks: repo.forks_count,
          stargazers_count: repo.stargazers_count,
          created_at: repo.created_at,
          licenseid: !!repo.license ? repo.license.key : null,
          login: user.login
        }

        return formRepo;

      });

      return formatedRepos;

    }));

    let repos = [];

    response.forEach((userRepos)=>{
        repos.push(...userRepos);
    });

    repos = repos.filter((repo)=>{
      return(!!repo.full_name&&repo.full_name.length<=60);
    });

    const dbRepos = await Promise.all(repos.map(async(repo)=>{

      const { full_name, language, forks, stargazers_count, created_at, licenseid, login} = repo;

      const newRepo = { full_name, language, forks, stargazers_count, created_at, licenseid };
      const dbRepo = await Repository.create(newRepo);
      const user = await User.findOne({login});
      user.subscriptions.push(dbRepo);
      await user.save();
      return dbRepo;

    }));

    return res.status(200).json({ dbRepos });

  } catch (error) {

    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
