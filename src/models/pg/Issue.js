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
                            args: [1,100],
                            msg: "O título deve ter no máximo 100 caracteres."
                        }
                    }
                },

                body: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },

                created_at: {
                    type: DataTypes.DATE,
                },
			},
			{ sequelize, tableName: 'issues', timestamps: false }
		);
    }
    
    static associate(models){

        this.belongsTo(models.Repository, {
            as: 'issues_repos',
            foreignKey: 'repoid'
        });

    }
}

module.exports = Issue;