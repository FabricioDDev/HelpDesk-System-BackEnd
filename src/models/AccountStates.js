const { DataTypes } = require('sequelize');
const sequelize = require('../config/database')

const AccountStates = sequelize.define('AccountStates',{
    accountStateId: {
        type: DataTypes.BIGINT(2),
        primaryKey: true,
        autoIncrement: true
    },
    accountStateName: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
},{
    tableName: "accountStates",
    timestamps: false
});

AccountStates.associate = function (models) {
    AccountStates.belongsTo(models.Users, {
        as: "Users",
        foreignKey: "userId"
    })

}

module.exports = AccountStates