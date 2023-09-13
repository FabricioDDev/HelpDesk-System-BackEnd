const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Users = sequelize.define('Users', {
    userId: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true
    },name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    roleId: {
        type: DataTypes.BIGINT(11),
        allowNull: false
    },
    accountStateId: {
        type: DataTypes.BIGINT(2),
        allowNull: false
    },
    userLocked: {
        type: DataTypes.BOOLEAN(1),
        allowNull: false
    },
    createdDate: {
        type: DataTypes.DATE,
        allowNull: false
    },

},{
    tableName: "users",
    timestamps: false
})


// Associations
Users.associate = function (models) {
    Users.hasMany(models.LoginFails, {
        as: "LoginFails",
        foreignKey: "loginFailId"
    })
    Users.belongsTo(models.Roles, {
        as: "Roles",
        foreignKey: "roleId"
    })
    Users.belongsTo(models.AccountStates, {
        as: "AccountStates",
        foreignKey: "accountStateId"
    })

}

module.exports = Users;