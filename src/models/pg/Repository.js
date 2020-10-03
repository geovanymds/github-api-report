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

                repo_name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        len: {
                            args: [1,40],
                            msg: "O nome do repositório deve ter no máximo 40 caracteres."
                        }
                    }
                },

                qnt_forks: {
                    type: DataTypes.INTEGER,
                },

                qnt_stars: {
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
            foreignKey: 'license'
        });

        this.belongsToMany(models.User, {
            as: 'contributed_repo',
            through: 'repository_contributors',
            foreignKey: 'repo_id'
        });

        this.hasMany(models.Issue, {
            as: 'repo_issue',
            foreignKey: 'repo'
        });

        this.hasMany(models.Language, {
            as: 'repo_languages',
            foreignKey: 'repo'
        });
    }
}

module.exports = Repository;