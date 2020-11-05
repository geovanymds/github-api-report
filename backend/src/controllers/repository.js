const Repository = require('../models/pg/Repository');
const { fn, col } = require('sequelize');

exports.getLanguages = async (req,res,next) => {

  try {

    const repos = await Repository.findAll({
      attributes: [[fn('DISTINCT', col('language')), 'language']],
    });

    const languages = repos.map(({language})=>{
      return language;
    }).filter((language)=>{
      return !!language;
    });

    return res.status(200).json(languages);

  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }

}