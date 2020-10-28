const axios = require("axios");
const Repository = require("../../models/mongo/Repository");
const Issue = require("../../models/mongo/Issue");
const config = require("../../../config/axios");
const BASE_URL = "https://api.github.com";

exports.getGitIssues = async (req, res, next) => {
  const limite = 200;

  const { page } = req.body;

  try {
    const repos = await Repository.find()
      .skip((page - 1) * limite)
      .limit(limite);

    var response = await Promise.all(
      repos.map(async (repo) => {
        const { data } = await axios.get(
          `${BASE_URL}/repos/${repo.full_name}/issues`,
          config
        );

        const formatedData = data.map((issue) => {
          return {
            full_name: repo.full_name,
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
      return issue.length > 0;
    });

    var issues = [];

    response.forEach((repoIssues) => {
      issues.push(...repoIssues);
    });

    issues = issues.filter((issue) => {
      return !!issue.body && issue.title.length <= 100;
    });
    
    const dbIssues = await Promise.all(
      issues.map(async (issue) => {
        const { full_name, title, body, created_at } = issue;
        const newIssue = {title, body, created_at};
        const dbIssue = await Issue.create(newIssue);
        const repo = await Repository.findOne({full_name});
        repo.issues.push(dbIssue);
        await repo.save();

        return dbIssue;
      })
    );

    return res.status(200).json({ dbIssues });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
