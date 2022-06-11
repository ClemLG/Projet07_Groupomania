const Sequelize = require("sequelize")
const sequelize = require("../config/db")

const Post = sequelize.define("post", {
    imageUrl: {
        type: Sequelize.STRING
    },

    content: {
        type: Sequelize.STRING,
        defaultValue: ""
    }
})


module.exports = Post