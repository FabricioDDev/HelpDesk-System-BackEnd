const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Roles = sequelize.define('Roles', {
    roleId: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true
    },
    roleName: {
        type: DataTypes.STRING(50),
        allowNull: false
    }  
}, {
    tableName: "roles",
    timestamps: false
});

Roles.associate = function (models) {
    Roles.belongsTo(models.Users, {
        as: "Users",
        foreignKey: "userId"
    })
}

module.exports = Roles;