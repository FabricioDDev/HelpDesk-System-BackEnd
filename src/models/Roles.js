const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Roles = sequelize.define('Roles', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    roleName: {
        type: DataTypes.STRING(50),
        allowNull: false
    }  
}, {
    tableName: "roles",
    timestamps: true,
});

Roles.associate = function (models) {
    Roles.belongsTo(models.Users, {
        as: "Users",
        foreignKey: "userId"
    })
}

module.exports = Roles;