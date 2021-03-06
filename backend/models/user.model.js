const Sequelize = require("sequelize")
const sequelize = require("../config/db")

// Import des models
const Post =  require('./post.model')
const Comment = require('./comment.model')
const Like = require('./like.model')
const User = sequelize.define("user", {
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
User.hasMany(Post, {onDelete: 'cascade'})
User.hasMany(Comment, {onDelete: 'cascade'})
User.hasMany(Like, {onDelete: 'cascade'})

Post.belongsTo(User)
Post.hasMany(Comment, {onDelete: 'cascade'})
Post.hasMany(Like, {onDelete: 'cascade'})

Comment.belongsTo(User)
Comment.belongsTo(Post)

module.exports = User