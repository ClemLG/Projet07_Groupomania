const Sequelize = require("sequelize")
const sequelize = require("../config/db")

// Import models
const PostModel = require('./post.model')
const UserModel = require('./user.model')

const CommentModel = sequelize.define("comment", {
    content: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
})


// Export
module.exports = CommentModel