'use strict';

const { DataTypes, Model } = require('sequelize');

class User extends Model {
    static init(sequelize) {
		super.init(
			{

                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                },

                login: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        len: {
                            args: [1,39],
                            msg: "O login deve ter no máximo 39 caracteres."
                        }
                    }
                },

                username: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    validate: {
                        len: {
                            args: [1,63],
                            msg: "O nome de usuário deve ter no máximo 63 caracteres."
                        }
                    }
                },

                qnt_followers: {
                    type: DataTypes.INTEGER,
                },

                user_type: {
                    type: DataTypes.CHAR,
                    allowNull: false,
                    validate: {
                        is: {
                            args: /[ou]/,
                            msg: "O tipo de usuário deve ser o (organization) ou u(user)."
                        }
                    }
                },

                user_location: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    validate: {
                        len: {
                            args: [1,100],
                            msg: "O nome de usuário deve ter no máximo 63 caracteres."
                        }
                    }
                },

                qnt_repositories: {
                    type: DataTypes.INTEGER,
                },

			},
			{ sequelize, tableName: 'users', timestamps: false}
		);
    }
    
    static associate(models){

        this.hasMany(models.Issue, {
            as: 'issue_owner',
            foreignKey: 'owner'
        });

        this.hasMany(models.Repository, {
            as: 'repo_owner',
            foreignKey: 'owner'
        });
        
        this.belongsToMany(models.Repository, {
            as: 'contributor_repo',
            through: 'repository_contributors',
            foreignKey: 'user_id'
        });
    }
}

module.exports = User;