const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LoginFails = sequelize.define('LoginFails', {
    loginFailId: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.BIGINT(11),
        allowNull: false
    },
    failedDate: {
        type: DataTypes.DATE,
        allowNull: false
    }, 
}, {
    tableName: "loginFails",
    timestamps: false 
});

LoginFails.associate = function (models) {
    LoginFails.belongsTo(models.Users, {
        as: "Users",
        foreignKey: "userId"
    })
}




module.exports = LoginFails;