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
                            args: [1,60],
                            msg: "O nome do repositório deve ter no máximo 60 caracteres."
                        }
                    }
                },

                language: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    validate: {
                        len: {
                            args: [1,30],
                            msg: "A linguagem do repositório deve ter no máximo 30 caracteres."
                        }
                    }
                },

                forks: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },

                stargazers_count: {
                    type: DataTypes.INTEGER,
                },

                created_at: {
                    type: DataTypes.DATE,
                },

                owner: {
                    type: DataTypes.INTEGER,
                },

                licenseid: {
                    type: DataTypes.STRING,
                    allowNull: true,
                }

			},
			{ sequelize, tableName: 'repositories', timestamps: false, schema: 'gitdatabase' }
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
            as: 'repoSubscriptions',
            through: 'repository_subscriptions',
            foreignKey: 'repoid',
            timestamps: false
        });

        this.hasMany(models.Issue, {
            as: 'repo_issue',
            foreignKey: 'repoid'
        });

    }
}

module.exports = Repository;