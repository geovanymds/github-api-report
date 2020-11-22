const Repository = require("../models/pg/Repository");
const reposQuery = require('../helpers/reposQuery');
const User = require("../models/pg/User");
const userQuery = require("../helpers/userQuery");

exports.report = async (req, res, next) => {

  try {
    const statements = userQuery(req.query,next);
    const users = await User.findAll(statements);

    return res.status(200).json({ users: users});
  } catch(error) {
    if(!error.statusCode) {
      error.statusCode=500;
    }
    next(error);
  }

}