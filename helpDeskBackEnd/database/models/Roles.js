module.exports = (sequelize, dataTypes) => {
    let alias = "Roles";

    let cols = {
        roleId: {
            type: dataTypes.BIGINT(11),
            primaryKey: true,
            autoIncrement: true
        },
        roleName: {
            type: dataTypes.STRING(50),
            allowNull: false
        }
    };
    let config = {
        tableName: "roles",
        timestamps: false
    };

    const Roles = sequelize.define(alias, cols, config);

    Roles.associate = function (models) {
        Roles.belongsTo(models.Users, {
            as: "Users",
            foreignKey: "userId"
        })

    }

    return Roles
}