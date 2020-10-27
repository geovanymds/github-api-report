const axios = require("axios");
const { Op } = require("sequelize");
const User = require("../models/pg/User");
const Repository = require("../models/pg/Repository");
const License = require('../models/pg/License');
const config = require("../../config/axios");
const BASE_URL = "https://api.github.com";

exports.getGitRepos = async (req, res, next) => {

  const { begin, end} = req.body;

  var idInit = await Repository.max('id');
  const licenses = (await License.findAll({attributes:['id']})).map((license)=>{
    return license.id;
  });

  if(!idInit) {
    idInit = 1;
  }

  try {

    const users = await User.findAll({
      where: {
        id: {
          [Op.between]: [begin,end]
        },
      },
      order: [["id", "ASC"]],
    });

    // Get repos information
    var response = await Promise.all(users.map(async (user)=>{

      const { data } = await axios.get(
        `${BASE_URL}/users/${user.login}/repos`,
        config
      );

      const formatedRepos = data.map((repo)=>{

        const formRepo = {
          id: idInit,
          full_name: repo.full_name,
          language: repo.language,
          forks: repo.forks_count,
          stargazers_count: repo.stargazers_count,
          created_at: repo.created_at,
          owner: user.id,
          licenseid: repo.license
        }

        if(!!formRepo.licenseid&&licenses.includes(formRepo.licenseid.key)) {
          formRepo.licenseid = formRepo.licenseid.key;
        } else {
          formRepo.licenseid = null;
        }

        return formRepo;

      });

      return formatedRepos.sort((a,b)=>{a<b});

    }));

    const repos = [];

    response.forEach((userRepos)=>{
        repos.push(...userRepos);
    });

    repos.forEach((repo)=>{
      repo.id = idInit;
      idInit++;
    });

    const dbRepos = await Promise.all(repos.map(async(repo)=>{

      const dbRepo = await Repository.create(repo);
      return dbRepo;

    }));

    return res.status(200).json({ Message: repos });

  } catch (error) {

    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};


exports.getGitSubscriptions = async (req, res, next) => {

  const begin = req.query.begin;
  const end = req.query.end;
  var idInit = await Repository.max('id');
  idInit += 1;
  const licenses = (await License.findAll({attributes:['id']})).map((license)=>{
    return license.id;
  });

  if(!idInit) {
    idInit = 1;
  }

  try {

    const users = await User.findAll({
      where: {
        id: {
          [Op.between]: [begin,end]
        },
      },
      order: [["id", "ASC"]],
    });

    // Get repos information
    var response = await Promise.all(users.map(async (user)=>{

      const { data } = await axios.get(
        `${BASE_URL}/users/${user.login}/subscriptions`,
        config
      );

      const formatedRepos = data.map((repo)=>{

        const formRepo = {
          id: idInit,
          full_name: repo.full_name,
          language: repo.language,
          forks: repo.forks_count,
          stargazers_count: repo.stargazers_count,
          created_at: repo.created_at,
          subscriber: user.id,
          licenseid: repo.license
        }

        if(!!formRepo.licenseid&&licenses.includes(formRepo.licenseid.key)) {
          formRepo.licenseid = formRepo.licenseid.key;
        } else {
          formRepo.licenseid = null;
        }

        return formRepo;

      });

      return formatedRepos;

     }));

    const repos = [];

    response.forEach((userRepos)=>{
        repos.push(...userRepos);
    });

    repos.forEach((repo)=>{
      repo.id = idInit;
      idInit++;
    });

    const dbRepos = await Promise.all(repos.map(async(repo)=>{

      const {id, full_name, language, forks, stargazers_count, created_at, licenseid, subscriber } = repo;

      var [dbRepo] = await Repository.findCreateFind({
        where: {full_name},
        defaults: {id, full_name, language, forks, stargazers_count, created_at, licenseid }
      });
      
      const repoSubscriber = await User.findByPk(subscriber);
      
      await dbRepo.setRepoSubscriptions(repoSubscriber, {save: false});

      return dbRepo;

    }));

    return res.status(200).json({ Message: "Sucesso" });

  } catch (error) {

    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
