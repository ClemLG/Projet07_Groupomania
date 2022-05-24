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
    },

    dislikes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
})

// Associations
/*PostModel.hasMany(CommentModel)
PostModel.belongsTo(UserModel)*/

module.exports = PostModel