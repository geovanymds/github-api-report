const { Op } = require("sequelize");
const sequelize = require("../models/pg/index");

module.exports = (statements,next) => {
  const today = Date.now();

  const query = {};
  query.where = {};
  query.include = [];
  query.limit = 150;

  const DEFAULT_BEGIN = "2008-01-01";
  const DEFAULT_END = today;

  const {
    full_name,
    forks,
    stars,
    begin,
    end,
    owner,
    offset
  } = statements;

  query.offset = !!offset ? offset:0;

  try {

    let {attributes, licenses, languages} = statements;

    if(!!attributes&&attributes.length>0) {
      query.attributes = attributes;
    }
  
    if(!!licenses&&licenses.length>0) {
      query.include.push({
        as: "repo_license",
        model: sequelize.models.License,
        where: {
          id: {
            [Op.or]: licenses,
          },
        },
        attributes: ['id']
      });
    }
  
    if(!!languages&&languages.length>0) {
      query.where.language = {
        [Op.or]: languages,
      };
    }
  
    if (!!full_name) {
      query.where.full_name = {
        [Op.like]: `%${full_name}%`,
      };
    } 
  
    if (!!forks) {
      query.where.forks = {
        [Op.gte]: forks,
      };
    }
  
    if (!!stars) {
      query.where.stargazers_count = {
        [Op.gte]: stars,
      };
    }
  
    if (!!(begin && end)) {
      query.where.created_at = {
        [Op.between]: [begin, end],
      };
    } else if (!!begin) {
      query.where.created_at = {
        [Op.between]: [begin, DEFAULT_END],
      };
    } else if (!!end) {
      query.where.created_at = {
        [Op.between]: [DEFAULT_BEGIN, end],
      };
    } else {
      query.where.created_at = {
        [Op.between]: [DEFAULT_BEGIN, DEFAULT_END],
      };
    }
  
    if (!!owner) {
      query.include.push({
        as: "owner_repo",
        model: sequelize.models.User,
        where: {
          login: {
            [Op.like]: `%${owner}%`,
          },
        },
        attributes: ['login']
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
