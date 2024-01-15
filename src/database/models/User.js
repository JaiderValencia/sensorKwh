module.exports = (sequelize, DataTypes) => {
    const alias = 'User'

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        full_name: {
            type: DataTypes.TEXT(),
            allowNull: false
        },
        email: {
            type: DataTypes.TEXT(),
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT(),
            allowNull: false
        },
        phone: {
            type: DataTypes.TEXT(),
            allowNull: false
        },
    }

    const config = {
        timestamps: false,
        tableName: 'user'
    }

    const User = sequelize.define(alias, cols, config)

    return User
}