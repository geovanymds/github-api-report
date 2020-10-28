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

                name: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    validate: {
                        len: {
                            args: [1,63],
                            msg: "O nome de usuário deve ter no máximo 63 caracteres."
                        }
                    }
                },

                followers: {
                    type: DataTypes.INTEGER,
                },

                type: {
                    type: DataTypes.CHAR,
                    allowNull: false,
                    validate: {
                        is: {
                            args: /[ou]/,
                            msg: "O tipo de usuário deve ser o (organization) ou u(user)."
                        }
                    }
                },

                location: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    validate: {
                        len: {
                            args: [1,100],
                            msg: "O nome de usuário deve ter no máximo 63 caracteres."
                        }
                    }
                },

                public_repos: {
                    type: DataTypes.INTEGER,
                },

			},
			{ sequelize, tableName: 'users', timestamps: false, schema: 'gitdatabase'}
		);
    }
    
    static associate(models){

        this.hasMany(models.Repository, {
            as: 'repo_owner',
            foreignKey: 'owner'
        });
        
        this.belongsToMany(models.Repository, {
            as: 'subscriberRepo',
            through: 'repository_subscriptions',
            foreignKey: 'userid'
        });
    }
}

module.exports = User;