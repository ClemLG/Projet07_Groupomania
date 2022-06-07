const Sequelize = require("sequelize")
const sequelize = require("../config/db")

// Import model
const CommentModel = require('./comment.model')
const UserModel = require('./user.model')

const PostModel = sequelize.define("post", {
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
    }
})


module.exports = PostModel