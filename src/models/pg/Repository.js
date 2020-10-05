'use strict';

const { DataTypes, Model } = require('sequelize');
const Sequelize = require('sequelize');

class Repository extends Model {
    static init(sequelize) {
		super.init(
			{

                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                },

                full_name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        len: {
                            args: [1,40],
                            msg: "O nome do repositório deve ter no máximo 40 caracteres."
                        }
                    }
                },

                language: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        len: {
                            args: [1,30],
                            msg: "A linguagem do repositório deve ter no máximo 30 caracteres."
                        }
                    }
                },

                forks: {
                    type: DataTypes.INTEGER,
                },

                stargazers_count: {
                    type: DataTypes.INTEGER,
                },

                created_at: {
                    type: DataTypes.DATE,
                    defaultValue: Sequelize.NOW
                },

                qnt_followers: {
                    type: DataTypes.INTEGER,
                }

			},
			{ sequelize, tableName: 'users', underscored: true }
		);
    }
    
    static associate(models){

        this.belongsTo(models.User,{
            as: 'owner_repo',
            foreignKey: 'owner'
        });

        this.belongsTo(models.License,{
            as: 'repo_license',
            foreignKey: 'licenseid'
        });

        this.belongsToMany(models.User, {
            as: 'contributed_repo',
            through: 'repository_contributors',
            foreignKey: 'repoid'
        });

        this.hasMany(models.Issue, {
            as: 'repo_issue',
            foreignKey: 'repoid'
        });

    }
}

module.exports = Repository;