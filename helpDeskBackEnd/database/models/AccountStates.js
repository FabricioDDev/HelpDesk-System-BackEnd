module.exports = (sequelize, dataTypes) => {
    let alias = "AccountStates";

    let cols = {
        accountStateId: {
            type: dataTypes.BIGINT(2),
            primaryKey: true,
            autoIncrement: true
        },
        accountStateName: {
            type: dataTypes.STRING(50),
            allowNull: false
        }
    };
    let config = {
        tableName: "accountStates",
        timestamps: false
    };

    const AccountStates = sequelize.define(alias, cols, config);

    AccountStates.associate = function (models) {
        AccountStates.belongsTo(models.Users, {
            as: "Users",
            foreignKey: "userId"
        })

    }

    return AccountStates
}
