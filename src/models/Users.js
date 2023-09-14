const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Users = sequelize.define('Users', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
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
        type: DataTypes.UUID,
        allowNull: false
    },
    accountStateId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    userLocked: {
        type: DataTypes.BOOLEAN,
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