'use strict';

const { DataTypes, Model } = require('sequelize');

class License extends Model {
    static init(sequelize) {
		super.init(
			{

                id: {
                    type: DataTypes.STRING,
                    primaryKey:true,
                    validate: {
                        len: {
                            args: [1,30],
                            msg: "O nome da linguagem deve ter no máximo 30 caracteres."
                        }
                    }
                },

                description: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },

			},
			{ sequelize, tableName: 'licenses' }
		);
    }
    
    static associate(models){

        this.hasMany(models.Repository, {
            as: 'license_repo',
            foreignKey: 'licenseid'
        });

        this.hasMany(models.Permission, {
            as: 'license_permission',
            foreignKey: 'licenseid'
        });

    }
}

module.exports = License;