const Sequelize = require("sequelize")
const sequelize = require("../config/db")

const PostModel = sequelize.define("post", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    },

    imageUrl: {
        type: Sequelize.STRING
    },

    content: {
        type: Sequelize.STRING,
        defaultValue: ""
    },

    likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },

})

module.exports = PostModel
