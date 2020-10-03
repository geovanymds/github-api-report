'use strict';

const { DataTypes, Model } = require('sequelize');
const Repository = require('./Repository');

class Language extends Model {
    static init(sequelize) {
		super.init(
			{

                repo: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                },

                lang_name: {
                    type: DataTypes.STRING,
                    primaryKey:true,
                    validate: {
                        len: {
                            args: [1,30],
                            msg: "O nome da linguagem deve ter no máximo 30 caracteres."
                        }
                    }
                },

                qnt_bytes: {
                    type: DataTypes.INTEGER,
                },

			},
			{ sequelize, tableName: 'languages' }
		);
    }

    static associate(models){

        this.belongsTo(models.Repository, {
            as: 'languages_repos',
            foreignKey: 'repo'
        });
    }
}

module.exports = Language;