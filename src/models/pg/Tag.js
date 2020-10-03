'use strict';

const { DataTypes, Model } = require('sequelize');
const Repository = require('./Repository');
const Issue = require('./Issue');

class Tag extends Model {
    static init(sequelize) {
		super.init(
			{

                iss_id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    references: {
                        model: Issue,
                        key: 'id'
                    }
                },

                iss_repo: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    references: {
                        model: Repository,
                        key: 'id'
                    }
                },

                tag_name: {
                    type: DataTypes.STRING,
                    primaryKey: true,
                    allowNull: false,
                    validate: {
                        len: {
                            args: [1,20],
                            msg: "O nome da TAG deve ter no máximo 20 caracteres."
                        }
                    }
                },

			},
			{ sequelize, tableName: 'tags' }
		);
    }
    
    static associate(models){

        this.belongsTo(models.Issue, {
            as: 'tag_issue',
            foreignKey: 'iss_id',
            targetKey: 'id',

        });

        this.belongsTo(models.Issue, {
            as: 'issue_tag_repo',
            foreignKey: 'iss_repo',
            targetKey: 'repo',
        });
    }
}

module.exports = Tag;