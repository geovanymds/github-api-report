'use strict';

const { DataTypes, Model } = require('sequelize');
const License = require('./License'); 

class Permission extends Model {
    static init(sequelize) {
		super.init(
			{

                licenseid: {
                    type: DataTypes.STRING,
                    primaryKey:true,
                    validate: {
                        len: {
                            args: [1,30],
                            msg: "A licença deve ter no máximo 30 caracteres."
                        }
                    }
                },

                name: {
                    type: DataTypes.STRING,
                    primaryKey:true,
                    validate: {
                        len: {
                            args: [1,30],
                            msg: "O nome da permissao deve ter no máximo 30 caracteres."
                        }
                    }
                },

			},
			{ sequelize, tableName: 'permissions', timestamps: false, schema: 'gitdatabase' }
		);
    }

    static associate(models){

        this.belongsTo(models.License, {
            as: 'user_issue',
            foreignKey: 'licenseid'
        });
    }
}

module.exports = Permission;