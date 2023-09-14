const { DataTypes } = require('sequelize');
const sequelize = require('../config/database')

const AccountStates = sequelize.define('AccountStates',{
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
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