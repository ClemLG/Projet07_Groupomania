const Sequelize = require("sequelize")
const sequelize = require("../config/db")

const UserModel = sequelize.define("user", {

    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    roles: {
        type: Sequelize.TEXT,
        allowNull: false
    },

    active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },

    username: {
        type: Sequelize.STRING,
        allowNull: false
    },

    avatar: {
        type: Sequelize.STRING
    }
})

module.exports = UserModel