const axios = require("axios");
const { Op } = require("sequelize");
const Repository = require("../models/pg/Repository");
const Issue = require("../models/pg/Issue");
const config = require("../../config/axios");
const BASE_URL = "https://api.github.com";

exports.getGitIssues = async (req, res, next) => {

  const { begin, end} = req.body;

  try {
    const repos = await Repository.findAll({
      where: {
        id: {
          [Op.between]: [begin, end],
        },
      },
      order: [["id", "ASC"]],
    });

    var response = await Promise.all(
      repos.map(async (repo) => {
        const { data } = await axios.get(
          `${BASE_URL}/repos/${repo.full_name}/issues`,
          config
        );

        data.forEach((issue) => {
          issue.repoid = repo.id;
        });

        const formatedData = data.map((issue) => {
          return {
            repoid: repo.id,
            title: issue.title,
            body: issue.body,
            created_at: issue.created_at,
          };
        });

        return formatedData;
      })
    );

    //Removendo Issues vazias
    response = response.filter((issue) => {
      return (issue.length > 0);
    });

    var issues = [];

    //Modificando id
    response = response.map((repoIssues)=>{
        idInit =1;
        return repoIssues.map((issue)=>{
            issue.id = idInit;
            idInit++;
            return issue;
        });
    });

    response.forEach((repoIssues)=>{
        issues.push(...repoIssues);
    });

    issues = issues.filter((issue)=>{
      return(!!issue.body&&issue.title.length<=100);
    });

    const dbIssues = await Promise.all(issues.map(async(issue)=>{
        
        const dbIssue = await Issue.create(issue);
  
        return dbIssue;
    }));

    return res.status(200).json({ Response: issues });

  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
