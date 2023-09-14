const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LoginFails = sequelize.define('LoginFails', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    userId: {
        type: DataTypes.UUID,
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