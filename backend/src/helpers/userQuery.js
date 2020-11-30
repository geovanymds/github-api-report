const { Op } = require("sequelize");
const sequelize = require("../models/pg/index");

module.exports = (statements,next) => {
  const today = Date.now();

  const query = {};
  query.where = {};
  query.include = [];
  query.limit = 150;

  const {
    userLogin,
    followers,
    type,
    repos,
    attributes,
    offset
  } = statements;

  query.offset = !!offset ? offset*query.limit:0;

  try {

    const selected = attributes;

    if(!!selected&&selected.length>0) {
      query.attributes = selected;
    }
  
    if (!!userLogin) {
      query.where.login = {
        [Op.like]: `%${userLogin}%`,
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
      query.where.public_repos = {
        [Op.gte]: repos,
      };
    }
  
    if (!!attributes&&attributes.includes("public_repos")) {
      query.include.push({
        as: 'repo_owner',
        model: sequelize.models.Repository,
      });
    }
    console.log(query);
    return query;

  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};