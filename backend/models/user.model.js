const Sequelize = require("sequelize")
const sequelize = require("../config/db")

// Import des models
const PostModel =  require('./post.model')
const CommentModel = require('./comment.model')
const UserModel = sequelize.define("user", {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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



// Associations
UserModel.hasMany(PostModel)
UserModel.hasMany(CommentModel)

PostModel.belongsTo(UserModel)
// Associations
PostModel.hasMany(CommentModel)

// Associations
CommentModel.belongsTo(UserModel)
CommentModel.belongsTo(PostModel)

module.exports = UserModel