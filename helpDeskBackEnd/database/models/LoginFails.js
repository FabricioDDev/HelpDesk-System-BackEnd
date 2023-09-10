module.exports = (sequelize, dataTypes) => {
    let alias = "LoginFails";

    let cols = {
        loginFailId: {
            type: dataTypes.BIGINT(11),
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: dataTypes.BIGINT(11),
            allowNull: false
        },
        failedDate: {
            type: dataTypes.DATE,
            allowNull: false
        },


    };
    let config = {
        tableName: "loginFails",
        timestamps: false
    };

    const LoginFails = sequelize.define(alias, cols, config);

    LoginFails.associate = function (models) {
        LoginFails.belongsTo(models.Users, {
            as: "Users",
            foreignKey: "userId"
        })
    }


    return LoginFails
}
