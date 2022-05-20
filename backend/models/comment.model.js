const Sequelize = require("sequelize")
const sequelize = require("../config/db")

const CommentModel = sequelize.define("comment", {
    imageUrl: {
        type: Sequelize.STRING
    },

    content: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
})

// Export
module.exports = CommentModel