module.exports = (sequelize, dataTypes) => {
    let alias = "Users";

    let cols = {
        userId: {
            type: dataTypes.BIGINT(11),
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        lastName: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        userName: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        roleId: {
            type: dataTypes.BIGINT(11),
            allowNull: false
        },
        accountStateId: {
            type: dataTypes.BIGINT(2),
            allowNull: false
        },
        userLocked: {
            type: dataTypes.BOOLEAN(1),
            allowNull: false
        },
        createdDate: {
            type: dataTypes.DATE,
            allowNull: false
        },


    };
    let config = {
        tableName: "users",
        timestamps: false
    };

    const Users = sequelize.define(alias, cols, config);
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
    return Users
}
