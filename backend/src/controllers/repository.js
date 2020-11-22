const Repository = require("../models/pg/Repository");
const reposQuery = require('../helpers/reposQuery');
const User = require("../models/pg/User");
const License = require("../models/pg/License");
const { fn, col } = require("sequelize");

exports.main = async (req, res, next) => {
  try {
    const repos = await Repository.findAll({
      attributes: [[fn("DISTINCT", col("language")), "language"]],
    });

    const licenses = (
      await License.findAll({
        attributes: ["id"],
      })
    ).map((license) => {
      return license.id;
    });

    const languages = repos
      .map(({ language }) => {
        return language;
      })
      .filter((language) => {
        return !!language;
      });

    const attributes = {};

    attributes.repos = Object.entries(Repository.rawAttributes)
      .map((attribute, index) => {
        return attribute[0];
      })
      .filter((attribute) => {
        return attribute !== "id";
      });

    attributes.user = Object.entries(User.rawAttributes)
      .map((attribute, index) => {
        return attribute[0];
      })
      .filter((attribute) => {
        return attribute !== "id";
      });
    
    const totalUsers = await User.count(); 
    const totalRepos = await Repository.count(); 

    console.log(totalUsers,totalRepos);

    return res.status(200).json({
      languages: languages,
      licenses: licenses,
      attributes: attributes,
      totalUsers: totalUsers/150,
      totalRepos: totalRepos/150
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.report = async (req, res, next) => {

  try {
    const statements = reposQuery(req.query,next);
    const repos = await Repository.findAll(statements);
    

    return res.status(200).json({ repos: repos});
  } catch(error) {
    if(!error.statusCode) {
      error.statusCode=500;
    }
    next(error);
  }

}