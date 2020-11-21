const { Op } = require("sequelize");
const sequelize = require("../models/pg/index");

module.exports = (statements,next) => {
  const today = Date.now();

  const query = {};
  query.where = {};
  query.include = [];

  const {
    login,
    followers,
    type,
    repos,
    attributes
  } = statements;

  try {

    const selected = attributes;

    if(!!selected&&selected.length>0) {
      query.attributes = selected;
    }
  
    if (!!login) {
      query.where.login = {
        [Op.like]: `%${login}%`,
      };
    } 
  
    if (!!followers) {
      query.where.followers = {
        [Op.gte]: followers,
      };
    }
  
    if (!!type) {
      query.where.type = {
        [Op.eq]: type.charAt(0).toLowerCase(),
      };
    }

    if (!!repos) {
      query.where.repos = {
        [Op.gte]: repos,
      };
    }
  
    if (!!attributes&&attributes.includes("public_repos")) {
      query.include.push({
        as: 'repo_owner',
        model: sequelize.models.Repository,
      });
    }

    return query;

  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};