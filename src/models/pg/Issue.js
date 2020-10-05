'use strict';

const { DataTypes, Model, Sequelize } = require('sequelize');

class Issue extends Model {
    static init(sequelize) {
		super.init(
			{

                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                },

                repoid: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                },

                title: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        len: {
                            args: [1,50],
                            msg: "O título deve ter no máximo 50 caracteres."
                        }
                    }
                },

                body: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                    validate: {
                        len: {
                            args: [1,50],
                            msg: "O título deve ter no máximo 50 caracteres."
                        }
                    }
                },

                created_at: {
                    type: DataTypes.DATE,
                },

                closed_at: {
                    type: DataTypes.DATE,
                },

                state: {
                    type: DataTypes.CHAR,
                    validate: {
                        is: {
                            args: /[oc]/,
                            msg: "O estado do repositório deve ser informado como o (open) ou c (closed)."
                        }
                    }
                },

			},
			{ sequelize, tableName: 'issues' }
		);
    }
    
    static associate(models){

        this.belongsTo(models.Repository, {
            as: 'issues_repos',
            foreignKey: 'repoid'
        });

        this.belongsTo(models.User, {
            as: 'user_issue',
            foreignKey: 'userid'
        });

        this.hasMany(models.Tag, {
            as: 'issue_tag',
            foreignKey: 'issueid',
        });

        this.hasMany(models.Tag, {
            as: 'issue_repo_tag',
            foreignKey: 'iss_repo',
        });
    }
}

module.exports = Issue;