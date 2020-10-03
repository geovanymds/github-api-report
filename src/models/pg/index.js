const Sequelize = require('sequelize');
const config = require('../../../config/database');
const Issue = require('./Issue');
const Language = require('./Language');
const License = require('./License');
const Permission = require('./Permission');
const Repository = require('./Repository');
const Tag = require('./Tag');
const User = require('./User');

const sequelize = new Sequelize(config);

Issue.init(sequelize);
Language.init(sequelize);
License.init(sequelize);
Permission.init(sequelize);
Repository.init(sequelize);
Tag.init(sequelize);
User.init(sequelize);

Issue.associate(sequelize.models);
Language.associate(sequelize.models);
License.associate(sequelize.models);
Permission.associate(sequelize.models);
Repository.associate(sequelize.models);
Tag.associate(sequelize.models);
User.associate(sequelize.models);

module.exports = sequelize;