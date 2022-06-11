const Sequelize = require("sequelize")
const sequelize = require("../config/db")

const Comment = sequelize.define("comment", {
    content: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
})


// Export
module.exports = Comment